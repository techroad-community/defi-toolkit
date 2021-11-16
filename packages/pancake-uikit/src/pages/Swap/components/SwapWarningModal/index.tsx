import React, { useEffect } from "react";
import styled from "styled-components";
import { Token } from "@doodaswap/sdk";
import { Tags, TokenInfo, TokenList } from "@uniswap/token-lists";
// import { useTranslation } from "contexts/Localization";
// import { WrappedTokenInfo } from "state/lists/hooks";
import SwapWarningTokensConfig from "../../../../config/constants/swapWarningTokens";
import useTheme from "../../../../hooks/useTheme";
import SafemoonWarning from "./SafemoonWarning";
import BondlyWarning from "./BondlyWarning";
import Acknowledgement from "./Acknowledgement";

import { ModalBody, ModalContainer, ModalHeader } from "../../../../widgets/Modal";
import { Heading } from "../../../../components/Heading";
import { Box } from "../../../../components/Box";
import { Message } from "../../../../components/Message";

const StyledModalContainer = styled(ModalContainer)`
  max-width: 440px;
`;

const MessageContainer = styled(Message)`
  align-items: flex-start;
  justify-content: flex-start;
`;

type TagDetails = Tags[keyof Tags];
interface TagInfo extends TagDetails {
  id: string;
}

class WrappedTokenInfo extends Token {
  public readonly tokenInfo: TokenInfo;

  public readonly tags: TagInfo[];

  constructor(tokenInfo: TokenInfo, tags: TagInfo[]) {
    super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name);
    this.tokenInfo = tokenInfo;
    this.tags = tags;
  }

  public get logoURI(): string | undefined {
    return this.tokenInfo.logoURI;
  }
}

interface SwapWarningModalProps {
  swapCurrency: WrappedTokenInfo;
  onDismiss?: () => void;
}

// Modal is fired by a useEffect and doesn't respond to closeOnOverlayClick prop being set to false
const usePreventModalOverlayClick = () => {
  useEffect(() => {
    const preventClickHandler = (e: { stopPropagation: () => void; preventDefault: () => void }) => {
      e.stopPropagation();
      e.preventDefault();
      return false;
    };

    document.querySelectorAll('[role="presentation"]').forEach((el) => {
      el.addEventListener("click", preventClickHandler, true);
    });

    return () => {
      document.querySelectorAll('[role="presentation"]').forEach((el) => {
        el.removeEventListener("click", preventClickHandler, true);
      });
    };
  }, []);
};

const SwapWarningModal: React.FC<SwapWarningModalProps> = ({ swapCurrency, onDismiss }) => {
  // const { t } = useTranslation();
  const { theme } = useTheme();
  usePreventModalOverlayClick();

  const TOKEN_WARNINGS = {
    [SwapWarningTokensConfig.safemoon.address]: {
      symbol: SwapWarningTokensConfig.safemoon.symbol,
      component: <SafemoonWarning />,
    },
    [SwapWarningTokensConfig.bondly.address]: {
      symbol: SwapWarningTokensConfig.bondly.symbol,
      component: <BondlyWarning />,
    },
  };

  const SWAP_WARNING = TOKEN_WARNINGS[swapCurrency.address];

  return (
    <StyledModalContainer minWidth="280px">
      <ModalHeader background={theme.colors.gradients.cardHeader}>
        <Heading p="12px 24px">Notice for trading+ {SWAP_WARNING?.symbol}</Heading>
      </ModalHeader>
      <ModalBody p="24px">
        <MessageContainer variant="warning" mb="24px">
          <Box>{SWAP_WARNING.component}</Box>
        </MessageContainer>
        <Acknowledgement handleContinueClick={onDismiss!} />
      </ModalBody>
    </StyledModalContainer>
  );
};

export default SwapWarningModal;
