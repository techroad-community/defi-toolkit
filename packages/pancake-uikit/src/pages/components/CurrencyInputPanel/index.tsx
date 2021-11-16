/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
import React from "react";
import { Currency, Pair } from "@doodaswap/sdk";
// import {Button} from '../../../components/Button'
import styled from "styled-components";
import BigNumber from "bignumber.js";
import { useTranslation } from "../../contexts/Localization";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { ChevronDownIcon, Button, Text, useModal, Flex } from "../../../index";
import { CurrencyLogo, DoubleCurrencyLogo } from "../Logo";
// import { useCurrencyBalance } from "../../state/wallet/hooks";
// import CurrencySearchModal from "../SearchModal/CurrencySearchModal";

import { RowBetween } from "../Layout/Row";
import { Input as NumericalInput } from "./NumericalInput";

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? "0.75rem 0.5rem 0.75rem 1rem" : "0.75rem 0.75rem 0.75rem 1rem")};
`;
const CurrencySelectButton = styled(Button).attrs({ variant: "text", scale: "sm" })`
  padding: 1.5rem 1.2rem;
  background: #ffffff;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
`;
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`;
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  margin: 0px;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? "8px" : "20px")};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`;
const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 4px;
  // background-color: ${({ theme }) => theme.colors.input};
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  box-sizing: border-box;
  box-shadow: ${({ theme }) => theme.shadows.inset};
`;
interface CurrencyInputPanelProps {
  value: string;
  onUserInput: (value: string) => void;
  onMax?: () => void;
  showMaxButton: boolean;
  label?: string;
  onCurrencySelect: (currency: Currency) => void;
  currency?: Currency | null;
  disableCurrencySelect?: boolean;
  hideBalance?: boolean;
  pair?: Pair | null;
  hideInput?: boolean;
  otherCurrency?: Currency | null;
  id: string;
  showCommonBases?: boolean;
}

const StyledText = styled(Text)``;

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React();
  //   const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined);
  const selectedCurrencyBalance = 3456789.1234;
  const { t } = useTranslation();
  const translatedLabel = label || t("Input");

  const [onPresentCurrencyModal] = useModal(
    // <CurrencySearchModal
    //   onCurrencySelect={onCurrencySelect}
    //   selectedCurrency={currency}
    //   otherSelectedCurrency={otherCurrency}
    //   showCommonBases={showCommonBases}
    // />
    <h1>Hello CurrencySearch Modal</h1>
  );
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              {/* <Text fontSize="14px">{translatedLabel}</Text> */}
              {account && (
                <Text
                  color="doodaPrimary"
                  onClick={onMax}
                  fontSize="14px"
                  style={{ display: "inline", cursor: "pointer", textAlign: "center" }}
                >
                  {!hideBalance && !!currency
                    ? t("Balance: %balance%", { balance: selectedCurrencyBalance?.toPrecision(2) ?? t("Loading") })
                    : " -"}
                </Text>
              )}
            </RowBetween>
            <Text color="#CAD0D7" fontSize="14px">
              Input
            </Text>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: "0", borderRadius: "8px" } : {}} selected={disableCurrencySelect}>
          <CurrencySelectButton
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                onPresentCurrencyModal();
              }
            }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
              ) : currency ? (
                // <CurrencyLogo currency={currency} size="24px" style={{ marginRight: "8px" }} />
                <h1>Currency Logo</h1>
              ) : null}
              {pair ? (
                <Text id="pair">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <StyledText id="pair">
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length
                      )}`
                    : currency?.symbol) || t("Select a currency")}
                </StyledText>
              )}
              {!disableCurrencySelect && <ChevronDownIcon />}
            </Flex>
          </CurrencySelectButton>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val);
                }}
              />
              {account && currency && showMaxButton && label !== "To" && (
                <Button onClick={onMax} scale="sm" variant="text">
                  MAX
                </Button>
              )}
            </>
          )}
        </InputRow>
      </Container>
    </InputPanel>
  );
}
