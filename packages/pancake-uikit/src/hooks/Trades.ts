/* eslint-disable no-param-reassign */
// import { isTradeBetter } from "utils/trades";
import { Currency, CurrencyAmount, Pair, Token, Trade, Percent, currencyEquals } from "@doodaswap/sdk";
import flatMap from "lodash/flatMap";
import { useMemo } from "react";
import useActiveWeb3React from "./useActiveWeb3React";

import { useUserSingleHopOnly } from "../state/user/hooks";
import {
  BASES_TO_CHECK_TRADES_AGAINST,
  CUSTOM_BASES,
  BETTER_TRADE_LESS_HOPS_THRESHOLD,
  ADDITIONAL_BASES,
  ZERO_PERCENT,
  ONE_HUNDRED_PERCENT,
} from "../config/constants";
import { PairState, usePairs } from "./usePairs";
import { wrappedCurrency } from "../utils/wrappedCurrency";

// import { useUnsupportedTokens } from "./Tokens";
// eslint-disable-next-line import/no-duplicates
// import { ZERO_PERCENT, ONE_HUNDRED_PERCENT } from "../config/constants/index";

function isTradeBetter(
  tradeA: Trade | undefined | null,
  tradeB: Trade | undefined | null,
  minimumDelta: Percent = ZERO_PERCENT
): boolean | undefined {
  if (tradeA && !tradeB) return false;
  if (tradeB && !tradeA) return true;
  if (!tradeA || !tradeB) return undefined;

  if (
    tradeA.tradeType !== tradeB.tradeType ||
    !currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
    !currencyEquals(tradeB.outputAmount.currency, tradeB.outputAmount.currency)
  ) {
    throw new Error("Trades are not comparable");
  }

  if (minimumDelta.equalTo(ZERO_PERCENT)) {
    return tradeA.executionPrice.lessThan(tradeB.executionPrice);
  }
  return tradeA.executionPrice.raw.multiply(minimumDelta.add(ONE_HUNDRED_PERCENT)).lessThan(tradeB.executionPrice);
}

function useAllCommonPairs(currencyA?: Currency, currencyB?: Currency): Pair[] {
  const { chainId } = useActiveWeb3React();

  const [tokenA, tokenB] = chainId
    ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
    : [undefined, undefined];

  const bases: Token[] = useMemo(() => {
    if (!chainId) return [];

    const common = BASES_TO_CHECK_TRADES_AGAINST[56];
    const additionalA = tokenA ? ADDITIONAL_BASES[56]?.[tokenA.address] ?? [] : [];
    const additionalB = tokenB ? ADDITIONAL_BASES[56]?.[tokenB.address] ?? [] : [];

    return [...common, ...additionalA, ...additionalB];
  }, [chainId, tokenA, tokenB]);

  const basePairs: [Token, Token][] = useMemo(
    () => flatMap(bases, (base): [Token, Token][] => bases.map((otherBase) => [base, otherBase])),
    [bases]
  );

  const allPairCombinations: [Token, Token][] = useMemo(
    () =>
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base): [Token, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs,
          ]
            .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
            .filter(([tokenA_, tokenB_]) => {
              if (!chainId) return true;
              const customBases = CUSTOM_BASES[56];

              const customBasesA: Token[] | undefined = customBases?.[tokenA_.address];
              const customBasesB: Token[] | undefined = customBases?.[tokenB_.address];

              if (!customBasesA && !customBasesB) return true;

              if (customBasesA && !customBasesA.find((base) => tokenB_.equals(base))) return false;
              if (customBasesB && !customBasesB.find((base) => tokenA_.equals(base))) return false;

              return true;
            })
        : [],
    [tokenA, tokenB, bases, basePairs, chainId]
  );

  const allPairs = usePairs(allPairCombinations);

  // only pass along valid pairs, non-duplicated pairs
  return useMemo(
    () =>
      Object.values(
        allPairs
          // filter out invalid pairs
          .filter((result): result is [PairState.EXISTS, Pair] => Boolean(result[0] === PairState.EXISTS && result[1]))
          // filter out duplicated pairs
          .reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
            memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr;
            return memo;
          }, {})
      ),
    [allPairs]
  );
}

const MAX_HOPS = 3;

/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
export function useTradeExactIn(currencyAmountIn?: CurrencyAmount, currencyOut?: Currency): Trade | null {
  const allowedPairs = useAllCommonPairs(currencyAmountIn?.currency, currencyOut);

  const [singleHopOnly] = useUserSingleHopOnly();

  return useMemo(() => {
    if (currencyAmountIn && currencyOut && allowedPairs.length > 0) {
      if (singleHopOnly) {
        return (
          Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: 1, maxNumResults: 1 })[0] ??
          null
        );
      }
      // search through trades with varying hops, find best trade out of them
      let bestTradeSoFar: Trade | null = null;
      for (let i = 1; i <= MAX_HOPS; i++) {
        const currentTrade: Trade | null =
          Trade.bestTradeExactIn(allowedPairs, currencyAmountIn, currencyOut, { maxHops: i, maxNumResults: 1 })[0] ??
          null;
        // if current trade is best yet, save it
        if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
          bestTradeSoFar = currentTrade;
        }
      }
      return bestTradeSoFar;
    }

    return null;
  }, [allowedPairs, currencyAmountIn, currencyOut, singleHopOnly]);
}

/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export function useTradeExactOut(currencyIn?: Currency, currencyAmountOut?: CurrencyAmount): Trade | null {
  const allowedPairs = useAllCommonPairs(currencyIn, currencyAmountOut?.currency);

  const [singleHopOnly] = useUserSingleHopOnly();

  return useMemo(() => {
    if (currencyIn && currencyAmountOut && allowedPairs.length > 0) {
      if (singleHopOnly) {
        return (
          Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: 1, maxNumResults: 1 })[0] ??
          null
        );
      }
      // search through trades with varying hops, find best trade out of them
      let bestTradeSoFar: Trade | null = null;
      for (let i = 1; i <= MAX_HOPS; i++) {
        const currentTrade =
          Trade.bestTradeExactOut(allowedPairs, currencyIn, currencyAmountOut, { maxHops: i, maxNumResults: 1 })[0] ??
          null;
        if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
          bestTradeSoFar = currentTrade;
        }
      }
      return bestTradeSoFar;
    }
    return null;
  }, [currencyIn, currencyAmountOut, allowedPairs, singleHopOnly]);
}

export function useIsTransactionUnsupported(currencyIn?: Currency, currencyOut?: Currency): boolean {
  // const unsupportedTokens: { [address: string]: Token } = useUnsupportedTokens();
  const { chainId } = useActiveWeb3React();

  const tokenIn = wrappedCurrency(currencyIn, chainId);
  const tokenOut = wrappedCurrency(currencyOut, chainId);

  // if unsupported list loaded & either token on list, mark as unsupported
  // if (unsupportedTokens) {
  //   if (tokenIn && Object.keys(unsupportedTokens).includes(tokenIn.address)) {
  //     return true;
  //   }
  //   if (tokenOut && Object.keys(unsupportedTokens).includes(tokenOut.address)) {
  //     return true;
  //   }
  // }

  return false;
}
