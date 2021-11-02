import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
// import BigNumber from "bignumber.js";

import { Text } from "../../../../components/Text";
import useMatchBreakpoints from "../../../../hooks/useMatchBreakpoints";
// import { useTranslation } from "contexts/Localization";
// import { useCakeVault } from "state/pools/hooks";

import { DeserializedPool } from "../../../state/types";
// import { BIG_ZERO } from "utils/bigNumber";
// import { TokenPairImage } from "components/TokenImage";
// import CakeVaultTokenPairImage from "../../CakeVaultCard/CakeVaultTokenPairImage";
import DoodaVaultTokenPairImage from "../VaultPairImage/VaultPairImage";
import { TokenPairImage } from "../../TokenImage";
import { BaseCell, CellContent } from "./BaseCell";

interface NameCellProps {
  pool: DeserializedPool;
}

const StyledCell = styled(BaseCell)`
  flex: 5;
  flex-direction: row;
  padding-left: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 150px;
    padding-left: 32px;
  }
`;

const NameCell: React.FC<NameCellProps> = ({ pool }) => {
  // const { t } = useTranslation();
  const { isMobile } = useMatchBreakpoints();
  const { sousId, stakingToken, earningToken, userData, isFinished, isAutoVault } = pool;
  // const {
  //   userData: { userShares },
  // } = useCakeVault();
  // const hasVaultShares = userShares && userShares.gt(0);

  const stakingTokenSymbol = stakingToken.symbol;
  const earningTokenSymbol = earningToken.symbol;

  // const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO;
  // const isStaked = stakedBalance.gt(0);
  // const isManualCakePool = sousId === 0;

  // const showStakedTag = isAutoVault ? hasVaultShares : isStaked;

  // let title = `${t("Earn")} ${earningTokenSymbol}`;
  // let subtitle = `${t("Stake")} useFetchCakeVault${stakingTokenSymbol}`;
  // const showSubtitle = sousId !== 0 || (sousId === 0 && !isMobile);
  const title = "AUTO DOODA";
  const showStakedTag = false;
  const showSubtitle = false;
  const subtitle = "Earn DOODA token";
  // if (isAutoVault) {
  //   title = t("Auto CAKE");
  //   subtitle = t("Automatic restaking");
  // } else if (isManualCakePool) {
  //   title = t("Manual CAKE");
  //   subtitle = `${t("Earn")} CAKE ${t("Stake").toLocaleLowerCase()} CAKE`;
  // }

  return (
    <StyledCell role="cell">
      {isAutoVault ? (
        <>
          <DoodaVaultTokenPairImage mr="8px" width={40} height={40} />
        </>
      ) : (
        <TokenPairImage primaryToken={earningToken} secondaryToken={stakingToken} mr="8px" width={40} height={40} />
      )}
      <CellContent>
        {showStakedTag && (
          <Text fontSize="12px" bold color={isFinished ? "failure" : "secondary"} textTransform="uppercase">
            Staked
          </Text>
        )}
        <Text bold={!isMobile} small={isMobile}>
          {title}
        </Text>
        {showSubtitle && (
          <Text fontSize="12px" color="textSubtle">
            {subtitle}
          </Text>
        )}
      </CellContent>
    </StyledCell>
  );
};

// const useFetchCakeVault = () => {
//   const { account } = useWeb3React();
//   const { fastRefresh } = useRefresh();
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     dispatch(fetchCakeVaultPublicData());
//   }, [dispatch, fastRefresh]);

//   useEffect(() => {
//     dispatch(fetchCakeVaultUserData({ account }));
//   }, [dispatch, fastRefresh, account]);

//   useEffect(() => {
//     dispatch(fetchCakeVaultFees());
//   }, [dispatch]);
// };

// const useCakeVault = () => {
//   const {
//     totalShares: totalSharesAsString,
//     pricePerFullShare: pricePerFullShareAsString,
//     totalCakeInVault: totalCakeInVaultAsString,
//     estimatedCakeBountyReward: estimatedCakeBountyRewardAsString,
//     totalPendingCakeHarvest: totalPendingCakeHarvestAsString,
//     fees: { performanceFee, callFee, withdrawalFee, withdrawalFeePeriod },
//     userData: {
//       isLoading,
//       userShares: userSharesAsString,
//       cakeAtLastUserAction: cakeAtLastUserActionAsString,
//       lastDepositedTime,
//       lastUserActionTime,
//     },
//   } = useSelector((state: State) => state.pools.cakeVault);

//   const estimatedCakeBountyReward = useMemo(() => {
//     return new BigNumber(estimatedCakeBountyRewardAsString);
//   }, [estimatedCakeBountyRewardAsString]);

//   const totalPendingCakeHarvest = useMemo(() => {
//     return new BigNumber(totalPendingCakeHarvestAsString);
//   }, [totalPendingCakeHarvestAsString]);

//   const totalShares = useMemo(() => {
//     return new BigNumber(totalSharesAsString);
//   }, [totalSharesAsString]);

//   const pricePerFullShare = useMemo(() => {
//     return new BigNumber(pricePerFullShareAsString);
//   }, [pricePerFullShareAsString]);

//   const totalCakeInVault = useMemo(() => {
//     return new BigNumber(totalCakeInVaultAsString);
//   }, [totalCakeInVaultAsString]);

//   const userShares = useMemo(() => {
//     return new BigNumber(userSharesAsString);
//   }, [userSharesAsString]);

//   const cakeAtLastUserAction = useMemo(() => {
//     return new BigNumber(cakeAtLastUserActionAsString);
//   }, [cakeAtLastUserActionAsString]);

//   return {
//     totalShares,
//     pricePerFullShare,
//     totalCakeInVault,
//     estimatedCakeBountyReward,
//     totalPendingCakeHarvest,
//     fees: {
//       performanceFee,
//       callFee,
//       withdrawalFee,
//       withdrawalFeePeriod,
//     },
//     userData: {
//       isLoading,
//       userShares,
//       cakeAtLastUserAction,
//       lastDepositedTime,
//       lastUserActionTime,
//     },
//   };
// };

export default NameCell;
