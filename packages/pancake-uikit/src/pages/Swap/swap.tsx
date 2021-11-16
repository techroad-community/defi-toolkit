/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { CurrencyAmount, JSBI, Token, Trade } from "@doodaswap/sdk";
import BigNumber from "bignumber.js";

// import { Button, Text, ArrowDownIcon, Box, useModal } from "@doodaswap/uikit";
// import UnsupportedCurrencyFooter from "components/UnsupportedCurrencyFooter";
import { RouteComponentProps } from "react-router-dom";
import SwapWarningTokens from "../../config/constants/swapWarningTokens";
// import AddressInputPanel from "./components/AddressInputPanel";
// import { useIsTransactionUnsupported } from "../../hooks/Trades";
import { GreyCard } from "../components/Card";
import Column, { AutoColumn } from "../components/Layout/Column";
import ConfirmSwapModal from "./components/ConfigmSwalModal";
import CurrencyInputPanel from "../components/CurrencyInputPanel";
import { AutoRow, RowBetween } from "../components/Layout/Row";
// import AdvancedSwapDetailsDropdown from "./components/AdvancedSwapDetailsDropdown";
// import confirmPriceImpactWithoutFee from "./components/confirmPriceImpactWithoutFee.ts";
import confirmPriceImpactWithoutFee from "./components/confirmPriceImpactWithoutFee";
import { ArrowWrapper, SwapCallbackError, Wrapper } from "./components/styleds";
import TradePrice from "./components/TradePrice";
import ImportTokenWarningModal from "./components/ImportTokenWarningModal";
import ProgressSteps from "./components/ProgressSteps";
import { AppHeader, AppBody } from "../components/App";
// import ConnectWalletButton from "../../components/ConnectWalletButton";
import { useTranslation } from "../contexts/Localization";

import { INITIAL_ALLOWED_SLIPPAGE } from "../../config/constants";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { useCurrency, useAllTokens } from "../../hooks/Tokens";
// import { ApprovalState, useApproveCallbackFromTrade } from "../../hooks/useApproveCallback";
// import { useSwapCallback } from "../../hooks/useSwapCallback";
// import useWrapCallback, { WrapType } from "../../hooks/useWrapCallback";
import { Field } from "../../state/swap/actions";
import {
  useDefaultsFromURLSearch,
  // useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from "../../state/swap/hooks";
import { useExpertModeManager, useUserSlippageTolerance, useUserSingleHopOnly } from "../../state/user/hooks";
// import { maxAmountSpend } from "../../utils/maxAmountSpend";
import { computeTradePriceBreakdown, warningSeverity } from "../../utils/prices";
import CircleLoader from "../components/Loader/CircleLoader";
import Page from "./Page";
// import SwapWarningModal from "./components/SwapWarningModal";

import { Button } from "../../components/Button";
import { Text } from "../../components/Text";
import { ArrowDownIcon } from "../../components/Svg";
import { Box } from "../../components/Box";
import { useModal } from "../../widgets/Modal";

const Label = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
`;
const ConnectWalletButton = styled(Button)`
  background: blue;
`;
const StyledButton = styled(Button)`
  font-family: Roboto;
  border-radius: 2px !important;
`;
const IconContainer = styled.div`
  background: #f1f3f5;
  border: 2px solid #fff;
  position: absolute;
  top: 33.3%;
  z-index: 50;
  left: 45%;
  height: 40px;
  width: 40px;
  border-radius: 20rem;
`;
enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP,
}
enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

export default function SwapPage({ history }: RouteComponentProps) {
  // const loadedUrlParams = useDefaultsFromURLSearch();

  const { t } = useTranslation();

  // // token warning stuff
  // const [loadedInputCurrency, loadedOutputCurrency] = [
  //   useCurrency(loadedUrlParams?.inputCurrencyId),
  //   useCurrency(loadedUrlParams?.outputCurrencyId),
  // ];
  // const urlLoadedTokens: Token[] = useMemo(
  //   () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c instanceof Token) ?? [],
  //   [loadedInputCurrency, loadedOutputCurrency]
  // );

  // // dismiss warning if all imported tokens are in active lists
  // // const defaultTokens = useAllTokens();
  // const defaultTokens = {
  //   "hola address": {
  //     chainId: "56",
  //     address: "hola address",
  //     projectLink: "https://project-link.com",
  //     // constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string, projectLink?: string);
  //     equals: true,
  //     sortsBefore: false,
  //   },
  // };

  // const importTokensNotInDefault =
  //   urlLoadedTokens &&
  //   urlLoadedTokens.filter((token: Token) => {
  //     return !(token.address in defaultTokens);
  //   });

  // const { account } = useActiveWeb3React();

  // // for expert mode
  // const [isExpertMode] = useExpertModeManager();

  // // get custom setting values for user
  // const [allowedSlippage] = useUserSlippageTolerance();

  // // swap state
  // const { independentField, typedValue, recipient } = useSwapState();
  // const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo();

  // const wrapType = WrapType.UNWRAP;
  // // const {
  // //   wrapType,
  // //   execute: onWrap,
  // //   inputError: wrapInputError,
  // // } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue);
  // const wrapInputError = "This is Wrap input Error";
  // // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  // const showWrap: boolean = true;
  // const trade = showWrap ? undefined : v2Trade;

  // const parsedAmounts = showWrap
  //   ? {
  //       [Field.INPUT]: parsedAmount,
  //       [Field.OUTPUT]: parsedAmount,
  //     }
  //   : {
  //       [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
  //       [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
  //     };

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers();
  // const isValid = !swapInputError;
  // const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;

  const handleTypeInput = useCallback((value: string) => {
    // onUserInput(Field.INPUT, value);
    alert("user Input");
  }, []);
  // const handleTypeOutput = useCallback(
  //   (value: string) => {
  //     onUserInput(Field.OUTPUT, value);
  //   },
  //   [onUserInput]
  // );

  // // modal and loading
  // const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
  //   tradeToConfirm: Trade | undefined;
  //   attemptingTxn: boolean;
  //   swapErrorMessage: string | undefined;
  //   txHash: string | undefined;
  // }>({
  //   tradeToConfirm: undefined,
  //   attemptingTxn: false,
  //   swapErrorMessage: undefined,
  //   txHash: undefined,
  // });

  // const formattedAmounts = {
  //   [independentField]: typedValue,
  //   [dependentField]: showWrap
  //     ? parsedAmounts[independentField]?.toExact() ?? ""
  //     : parsedAmounts[dependentField]?.toSignificant(6) ?? "",
  // };

  // const route = trade?.route;
  // const userHasSpecifiedInputOutput = Boolean(
  //   currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  // );
  // const noRoute = !route;

  // // check whether the user has approved the router on the input token
  // // const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage);
  // const [approval, setApproval] = useState(ApprovalState.PENDING);

  // // check if user has gone through approval process, used to show two step buttons, reset on token change
  // const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);

  // // mark when a user has submitted an approval, reset onTokenSelection for input field
  // useEffect(() => {
  //   if (approval === ApprovalState.PENDING) {
  //     setApprovalSubmitted(true);
  //   }
  // }, [approval, approvalSubmitted]);

  // // const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT]);
  // const maxAmountInput = BigInt(30000000);
  // const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput));

  // // the callback to execute the swap
  // // const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient);
  // const swapCallbackError = true;

  // const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade);

  // const [singleHopOnly] = useUserSingleHopOnly();

  // const handleSwap = useCallback(() => {
  //   if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee, t)) {
  //     return;
  //   }
  //   // if (!swapCallback) {
  //   //   return;
  //   // }
  //   setSwapState({ attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined });
  //   // swapCallback()
  //   //   .then((hash) => {
  //   //     setSwapState({ attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: hash });
  //   //   })
  //   //   .catch((error) => {
  //   //     setSwapState({
  //   //       attemptingTxn: false,
  //   //       tradeToConfirm,
  //   //       swapErrorMessage: error.message,
  //   //       txHash: undefined,
  //   //     });
  //   //   });
  // }, [priceImpactWithoutFee, tradeToConfirm, t]);

  // // errors
  // const [showInverted, setShowInverted] = useState<boolean>(false);

  // // warnings on slippage
  // const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);

  // // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // // never show if price impact is above threshold in non expert mode
  // const showApproveFlow =
  //   !swapInputError &&
  //   (approval === ApprovalState.NOT_APPROVED ||
  //     approval === ApprovalState.PENDING ||
  //     (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
  //   !(priceImpactSeverity > 3 && !isExpertMode);

  // const handleConfirmDismiss = useCallback(() => {
  //   setSwapState({ tradeToConfirm, attemptingTxn, swapErrorMessage, txHash });
  //   // if there was a tx hash, we want to clear the input
  //   if (txHash) {
  //     onUserInput(Field.INPUT, "");
  //   }
  // }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash]);

  // const handleAcceptChanges = useCallback(() => {
  //   setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn });
  // }, [attemptingTxn, swapErrorMessage, trade, txHash]);

  // // swap warning state
  // const [swapWarningCurrency, setSwapWarningCurrency] = useState(true);
  // // const [onPresentSwapWarningModal] = useModal(<SwapWarningModal swapCurrency={swapWarningCurrency} />);

  // const shouldShowSwapWarning = (swapCurrency: any) => {
  //   const isWarningToken = Object.entries(SwapWarningTokens).find((warningTokenConfig) => {
  //     const warningTokenData = warningTokenConfig[1];
  //     return swapCurrency!.address === warningTokenData.address;
  //   });
  //   return Boolean(isWarningToken);
  // };

  // useEffect(() => {
  //   if (swapWarningCurrency) {
  //     // onPresentSwapWarningModal();
  //     alert("Swap warning");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [swapWarningCurrency]);

  // const handleInputSelect = useCallback(
  //   (inputCurrency) => {
  //     setApprovalSubmitted(false); // reset 2 step UI for approvals
  //     onCurrencySelection(Field.INPUT, inputCurrency);
  //     const showSwapWarning = shouldShowSwapWarning(inputCurrency);
  //     if (showSwapWarning) {
  //       setSwapWarningCurrency(inputCurrency);
  //     } else {
  //       setSwapWarningCurrency(null);
  //     }
  //   },
  //   [onCurrencySelection]
  // );

  // const handleMaxInput = useCallback(() => {
  //   if (maxAmountInput) {
  //     onUserInput(Field.INPUT, maxAmountInput.toString());
  //   }
  // }, [maxAmountInput, onUserInput]);
  const handleMaxInput = () => {
    alert("Handle Max input");
  };
  const handleInputSelect = () => {
    alert("Handle Input Select");
  };

  // const handleOutputSelect = useCallback(
  //   (outputCurrency) => {
  //     onCurrencySelection(Field.OUTPUT, outputCurrency);
  //     const showSwapWarning = shouldShowSwapWarning(outputCurrency);
  //     if (showSwapWarning) {
  //       setSwapWarningCurrency(outputCurrency);
  //     } else {
  //       setSwapWarningCurrency(null);
  //     }
  //   },

  //   [onCurrencySelection]
  // );

  // // const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT);
  // const swapIsUnsupported = false;

  // const [onPresentImportTokenWarningModal] = useModal(
  //   <ImportTokenWarningModal tokens={importTokensNotInDefault} onCancel={() => history.push("/swap/")} />
  // );

  // useEffect(() => {
  //   if (importTokensNotInDefault.length > 0) {
  //     onPresentImportTokenWarningModal();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [importTokensNotInDefault.length]);

  // const [onPresentConfirmModal] = useModal(
  //   <ConfirmSwapModal
  //     trade={trade}
  //     originalTrade={tradeToConfirm}
  //     onAcceptChanges={handleAcceptChanges}
  //     attemptingTxn={attemptingTxn}
  //     txHash={txHash}
  //     recipient={recipient}
  //     allowedSlippage={allowedSlippage}
  //     onConfirm={handleSwap}
  //     swapErrorMessage={swapErrorMessage}
  //     customOnDismiss={handleConfirmDismiss}
  //   />,
  //   true,
  //   true,
  //   "confirmSwapModal"
  // );
  return (
    <Page>
      <AppBody>
        <AppHeader title={t("Exchange")} subtitle={t("Trade tokens in an instant")} />
      </AppBody>
      <Wrapper id="swap-page">
        <AutoColumn gap="md">
          <CurrencyInputPanel
            label={t("From (estimated)")}
            value="100"
            showMaxButton
            // currency={currencies[Field.INPUT]}
            onUserInput={handleTypeInput}
            onMax={handleMaxInput}
            onCurrencySelect={handleInputSelect}
            // otherCurrency={currencies[Field.OUTPUT]}
            id="swap-currency-input"
          />
        </AutoColumn>
      </Wrapper>
      {/* {!swapIsUnsupported ? (
        // <AdvancedSwapDetailsDropdown trade={trade} />
        <h1>Advanced Swap Details Dropdown</h1>
      ) : (
        // <UnsupportedCurrencyFooter currencies={[currencies.INPUT, currencies.OUTPUT]} />
        <h1>Unsupported Currency</h1>
      )} */}
    </Page>
  );
}
