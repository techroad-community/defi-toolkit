/* eslint-disable import/no-extraneous-dependencies */
import { Currency, CurrencyAmount, ETHER, JSBI, Token, TokenAmount } from "@doodaswap/sdk";
import { Interface } from "@ethersproject/abi";
import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
// import ERC20_INTERFACE from "config/abi/erc20";
import { useAllTokens } from "../../hooks/Tokens";
// import { useMulticallContract } from "hooks/useContract";
import { isAddress } from "../../utils";
import { useSingleContractMultipleData, useMultipleContractSingleData } from "../multicall/hooks";
import ERC20_ABI from "../../config/abi/erc20.json";

const ERC20_INTERFACE = new Interface(ERC20_ABI);

/**
 * Returns a map of the given addresses to their eventually consistent BNB balances.
 */
// export function useBNBBalances(uncheckedAddresses?: (string | undefined)[]): {
//   [address: string]: CurrencyAmount | undefined;
// } {
//   const multicallContract = useMulticallContract();

//   const addresses: string[] = useMemo(
//     () =>
//       uncheckedAddresses
//         ? uncheckedAddresses
//             .map(isAddress)
//             .filter((a): a is string => a !== false)
//             .sort()
//         : [],
//     [uncheckedAddresses]
//   );

//   const results = useSingleContractMultipleData(
//     multicallContract,
//     "getEthBalance",
//     addresses.map((address) => [address])
//   );
//   const results = new BigNumber(30);

//   return useMemo(
//     () =>
//       addresses.reduce<{ [address: string]: CurrencyAmount }>((memo, address, i) => {
//         // const value = results?.[i]?.result?.[0];
//         const value = results;
//         // eslint-disable-next-line no-param-reassign
//         // if (value) memo[address] = CurrencyAmount.ether(JSBI.BigInt(value.toString()));
//         if (value) memo[address] = value;
//         return memo;
//       }, {}),
//     [addresses, results]
//   );
// }

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[]
): [{ [tokenAddress: string]: TokenAmount | undefined }, boolean] {
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isAddress(t?.address) !== false) ?? [],
    [tokens]
  );

  const validatedTokenAddresses = useMemo(() => validatedTokens.map((vt) => vt.address), [validatedTokens]);

  const balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20_INTERFACE, "balanceOf", [address]);

  const anyLoading: boolean = useMemo(() => balances.some((callState) => callState.loading), [balances]);

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: TokenAmount | undefined }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0];
              const amount = value ? JSBI.BigInt(value.toString()) : undefined;
              if (amount) {
                // eslint-disable-next-line no-param-reassign
                memo[token.address] = new TokenAmount(token, amount);
              }
              return memo;
            }, {})
          : {},
      [address, validatedTokens, balances]
    ),
    anyLoading,
  ];
}

export function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[]
): { [tokenAddress: string]: TokenAmount | undefined } {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0];
}

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): TokenAmount | undefined {
  const tokenBalances = useTokenBalances(account, [token]);
  if (!token) return undefined;
  return tokenBalances[token.address];
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Currency | undefined)[]
): (CurrencyAmount | undefined)[] {
  const tokens = useMemo(
    () => currencies?.filter((currency): currency is Token => currency instanceof Token) ?? [],
    [currencies]
  );

  const tokenBalances = useTokenBalances(account, tokens);
  const containsBNB: boolean = useMemo(() => currencies?.some((currency) => currency === ETHER) ?? false, [currencies]);
  //   const ethBalance = useBNBBalances(containsBNB ? [account] : []);
  const ethBalance = {
    account: 20,
  };

  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!account || !currency) return undefined;
        if (currency instanceof Token) return tokenBalances[currency.address];
        // if (currency === ETHER) return ethBalance[account];
        return undefined;
      }) ?? [],
    [account, currencies, tokenBalances]
  );
}

export function useCurrencyBalance(account?: string, currency?: Currency): CurrencyAmount | undefined {
  return useCurrencyBalances(account, [currency])[0];
}

// mimics useAllBalances
export function useAllTokenBalances(): { [tokenAddress: string]: TokenAmount | undefined } {
  const { account } = useWeb3React();
  const allTokens = useAllTokens();
  const allTokensArray = useMemo(() => Object.values(allTokens ?? {}), [allTokens]);
  const balances = useTokenBalances(account ?? undefined, allTokensArray!);
  return balances ?? {};
}
