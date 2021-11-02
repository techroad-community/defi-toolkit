import React from "react";
import styled from "styled-components";
// import useAuth from "hooks/useAuth";
import { Button } from "../../../components/Button";
import { useWalletModal } from "../../../widgets/WalletModal";
// import { useTranslation } from "../../contexts/Localization";

const StyledConnectButton = styled(Button)`
  background: ${({ theme }) => theme.colors.doodaPrimary};
  border-radius: 2px;
`;

const ConnectWalletButton = (props) => {
  // const { t } = useTranslation();
  // const { login, logout } = useAuth();
  // const { onPresentConnectModal } = useWalletModal(login, logout, t);

  return (
    <StyledConnectButton
      // onClick={onPresentConnectModal}
      {...props}
    >
      Connect Wallet
    </StyledConnectButton>
  );
};

export default ConnectWalletButton;
