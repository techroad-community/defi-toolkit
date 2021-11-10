import React from "react";
import styled from "styled-components";
import BigNumber from "bignumber.js";

// import ConnectWalletButton from "components/ConnectWalletButton";
import { useWeb3React } from "@web3-react/core";
import Balance from "../../Balance";
// import { useTranslation } from "../../../contexts/Localization";
import { getBalanceNumber } from "../../../utils/formatBalance";
import { PoolCategory, DeserializedPool } from "../../../state/types";
import { BIG_ZERO } from "../../../utils/bigNumber";
// import { useERC20 } from "hooks/useContract";
import { convertSharesToCake } from "../../helpers/helpers";
import { useCakeVault } from "../../state/pools/hooks";
import { ActionContainer, ActionTitles, ActionContent } from "./styles";
// import NotEnoughTokensModal from "../../PoolCard/Modals/NotEnoughTokensModal";
// import StakeModal from "../../PoolCard/Modals/StakeModal";
// import VaultStakeModal from "../../CakeVaultCard/VaultStakeModal";
// import { useCheckVaultApprovalStatus, useApprovePool, useVaultApprove } from "../../../hooks/useApprove";
// import { Button, useModal, IconButton, AddIcon, MinusIcon, Skeleton, useTooltip, Flex, Text } from '@doodaswap/uikit'
import { Button, IconButton } from "../../../../components/Button";
import { Flex } from "../../../../components/Box";
import { Text } from "../../../../components/Text";
import { useModal } from "../../../../widgets/Modal";
import { AddIcon, MinusIcon } from "../../../../components/Svg";
import { Skeleton } from "../../../../components/Skeleton";
import { useTooltip } from "../../../../hooks/useTooltip";

const IconButtonWrapper = styled.div`
  display: flex;
`;
const StyledButton = styled(Button)`
  border-radius: 2px !important;
  border: 0px !important;
  background-color: #3763a4;
  color: #fff;
`;

interface StackedActionProps {
  pool: DeserializedPool;
  userDataLoaded: boolean;
}

const Staked: React.FunctionComponent<StackedActionProps> = ({ pool, userDataLoaded }) => {
  // const {
  //   sousId,
  //   stakingToken,
  //   earningToken,
  //   stakingLimit,
  //   isFinished,
  //   poolCategory,
  //   userData,
  //   stakingTokenPrice,
  //   isAutoVault,
  // } = pool;
  // // const { t } = useTranslation();
  // const { account } = useWeb3React();

  // const stakingTokenContract = useERC20(stakingToken?.address || "");
  // const { handleApprove: handlePoolApprove, requestedApproval: requestedPoolApproval } = useApprovePool(
  //   stakingTokenContract,
  //   sousId,
  //   earningToken?.symbol
  // );

  // const { isVaultApproved, setLastUpdated } = useCheckVaultApprovalStatus();
  // const { handleApprove: handleVaultApprove, requestedApproval: requestedVaultApproval } =
  //   useVaultApprove(setLastUpdated);
  // const isVaultApproved = false;

  // // const handleApprove = isAutoVault ? handleVaultApprove : handlePoolApprove;
  // // const requestedApproval = isAutoVault ? requestedVaultApproval : requestedPoolApproval;

  // const isBnbPool = poolCategory === PoolCategory.BINANCE;
  // const allowance = userData?.allowance ? new BigNumber(userData.allowance) : BIG_ZERO;
  // const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO;
  // const isNotVaultAndHasStake = !isAutoVault && stakedBalance.gt(0);

  // const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO;

  // const stakedTokenBalance = getBalanceNumber(stakedBalance, stakingToken?.decimals);
  // // const stakedTokenDollarBalance = getBalanceNumber(
  // //   stakedBalance.multipliedBy(stakingTokenPrice),
  // //   stakingToken?.decimalstotalCakeInVaultAsString
  // // );
  // const stakedTokenDollarBalance = 100;

  // const {
  //   userData: { userShares },
  //   pricePerFullShare,
  // } = useCakeVault();

  // const { cakeAsBigNumber, cakeAsNumberBalance } = convertSharesToCake(userShares, pricePerFullShare);
  // const hasSharesStaked = userShares && userShares.gt(0);
  // const isVaultWithShares = isAutoVault && hasSharesStaked;
  // // const stakedAutoDollarValue = getBalanceNumber(
  // //   cakeAsBigNumber.multipliedBy(stakingTokenPrice),
  // //   stakingToken.decimals
  // // );
  // const stakedAutoDollerValue = 100;

  // const needsApproval = isAutoVault ? !isVaultApproved : !allowance.gt(0) && !isBnbPool;

  // const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />);

  // const [onPresentStake] = useModal(
  //   <StakeModal
  //     isBnbPool={isBnbPool}
  //     pool={pool}
  //     stakingTokenBalance={stakingTokenBalance}
  //     stakingTokenPrice={stakingTokenPrice}
  //   />
  // );

  // const [onPresentVaultStake] = useModal(<VaultStakeModal stakingMax={stakingTokenBalance} pool={pool} />);

  // const [onPresentUnstake] = useModal(
  //   <StakeModal
  //     stakingTokenBalance={stakingTokenBalance}
  //     isBnbPool={isBnbPool}
  //     pool={pool}
  //     stakingTokenPrice={stakingTokenPrice}
  //     isRemovingStake
  //   />const stakedTokenDollarBalance = getBalanceNumber(
  //   stakedBalance.multipliedBy(stakingTokenPrice),
  //   stakingToken?.decimalstotalCakeInVaultAsString
  // );
  // );

  // const [onPresentVaultUnstake] = useModal(
  //   <VaultStakeModal stakingMax={cakeAsBigNumber} pool={pool} isRemovingStake />
  // );

  // const onStake = () => {
  //   if (isAutoVault) {
  //     onPresentVaultStake();
  //   } else {
  //     onPresentStake();
  //   }
  // };

  // const onUnstake = () => {
  //   if (isAutoVault) {
  //     onPresentVaultUnstake();
  //   } else {
  //     onPresentUnstake();
  //   }
  // };

  // const { targetRef, tooltip, tooltipVisible } = useTooltip(
  //   "You've already staked the maximum amount you can stake in this pool!",
  //   { placement: "bottom" }
  // );

  // const reachStakingLimit = stakingLimit && userData?.stakedBalance?.gte(stakingLimit);

  // if (!account) {
  //   return (
  //     <ActionContainer>
  //       <ActionTitles>
  //         <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
  //           Start staking
  //         </Text>
  //       </ActionTitles>
  //       <ActionContent>
  //         {/* <ConnectWalletButton width="100%" /> */}
  //         <h1>Connect Wallet Button</h1>
  //       </ActionContent>
  //     </ActionContainer>
  //   );
  // }

  // if (!userDataLoaded) {
  //   return (
  //     <ActionContainer>
  //       <ActionTitles>
  //         <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
  //           Start staking
  //         </Text>
  //       </ActionTitles>
  //       <ActionContent>
  //         <Skeleton width={180} height="32px" marginTop={14} />
  //       </ActionContent>
  //     </ActionContainer>
  //   );
  // }

  // if (needsApproval) {
  //   return (
  //     <ActionContainer>
  //       <ActionTitles>
  //         <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
  //           Enable pool
  //         </Text>
  //       </ActionTitles>
  //       <ActionContent>
  //         <Button
  //           width="100%"
  //           //  disabled={requestedApproval} onClick={handleApprove}
  //           variant="secondary"
  //         >
  //           Enable
  //         </Button>
  //       </ActionContent>
  //     </ActionContainer>
  //   );
  // }

  // Wallet connected, user data loaded and approved
  // if (isNotVaultAndHasStake || isVaultWithShares) {
  //   return (
  //     <ActionContainer isAutoVault={isAutoVault}>
  //       <ActionTitles>
  //         <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
  //           {stakingToken?.symbol}{" "}
  //         </Text>
  //         <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
  //           {isAutoVault ? "Staked (compounding)" : "Staked"}
  //         </Text>
  //       </ActionTitles>
  //       <ActionContent>
  //         <Flex flex="1" pt="16px" flexDirection="column" alignSelf="flex-start">
  //           <Balance
  //             lineHeight="1"
  //             bold
  //             fontSize="20px"
  //             decimals={5}
  //             value={isAutoVault ? cakeAsNumberBalance : stakedTokenBalance}
  //           />
  //           <Balance
  //             fontSize="12px"
  //             display="inline"
  //             color="textSubtle"
  //             decimals={2}
  //             value={isAutoVault ? stakedAutoDollarValue : stakedTokenDollarBalance}
  //             unit=" USD"
  //             prefix="~"
  //           />
  //         </Flex>
  //         <IconButtonWrapper>
  //           <IconButton
  //             variant="secondary"
  //             // onClick={onUnstake}
  //             mr="6px"
  //           >
  //             <MinusIcon color="primary" width="14px" />
  //           </IconButton>
  //           {reachStakingLimit ? (
  //             <span ref={targetRef}>
  //               <IconButton variant="secondary" disabled>
  //                 <AddIcon color="textDisabled" width="24px" height="24px" />
  //               </IconButton>
  //             </span>
  //           ) : (
  //             // <IconButton
  //             //   variant="secondary"
  //             //   onClick={stakingTokenBalance.gt(0) ? onStake : onPresentTokenRequired}
  //             //   disabled={isFinished}
  //             // >
  //             //   <AddIcon color="primary" width="14px" />
  //             // </IconButton>
  //             <>
  //               <h1>Icon Button</h1>
  //             </>
  //           )}
  //         </IconButtonWrapper>
  //         {tooltipVisible && tooltip}
  //       </ActionContent>
  //     </ActionContainer>
  //   );
  // }

  return (
    <ActionContainer>
      {/* <ActionTitles>
        <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
          Stake
        </Text>
        <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
          {stakingToken?.symbol}
          DOODA
        </Text>
      </ActionTitles> */}
      <ActionContent>
        <StyledButton
          width="100%"
          // onClick={stakingTokenBalance.gt(0) ? onStake : onPresentTokenRequired}
          variant="secondary"
          disabled={false}
        >
          Stake
        </StyledButton>
      </ActionContent>
    </ActionContainer>
  );
};

// const Staked: React.FunctionComponent<StackedActionProps> = ({ pool, userDataLoaded }) => {
//   return <h1>Hello</h1>;
// };
export default Staked;
