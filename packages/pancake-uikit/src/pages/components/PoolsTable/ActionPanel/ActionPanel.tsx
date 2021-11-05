import React from "react";
import styled, { keyframes, css } from "styled-components";

// import { BASE_BSC_SCAN_URL } from "config";
// import { getBscScanLink } from "utils";
// import { useCakeVault } from "../../../state/hooks";
import BigNumber from "bignumber.js";
import { ChainId, JSBI, Percent, Token, CurrencyAmount, Currency, ETHER } from "@doodaswap/sdk";

// import { CompoundingPoolTag, ManualPoolTag } from "components/Tags";
import { getAddress, getCakeVaultAddress } from "../../../utils/addressHelpers";
import { BIG_ZERO } from "../../../utils/bigNumber";
// import { registerToken } from "utils/wallet";
import { getBalanceNumber, getFullDisplayBalance } from "../../../utils/formatBalance";
import { convertSharesToCake, getPoolBlockInfo } from "../../helpers/helpers";
// import { useBlock } from "../../../state/hooks";
import { DeserializedPool } from "../../../state/types";
// import { useTranslation } from "../../../contexts/Localization";
import Balance from "../../Balance";

// import {
//   Box,
//   Button,
//   Flex,
//   HelpIcon,
//   Link,
//   LinkExternal,
//   MetamaskIcon,
//   Skeleton,
//   Text,
//   TimerIcon,
//   useTooltip,
// } from "@doodaswap/uikit";
import { Box, Flex } from "../../../../components/Box";
import { Button } from "../../../../components/Button";
import { HelpIcon, MetamaskIcon, TimerIcon } from "../../../../components/Svg";
import { Link, LinkExternal } from "../../../../components/Link";
import { Skeleton } from "../../../../components/Skeleton";
import { Text } from "../../../../components/Text";
import { useTooltip } from "../../../../hooks";

import Harvest from "./Harvest";
import Stake from "./Stake";
import Apr from "../Apr";
import AutoHarvest from "./AutoHarvest";

const expandAnimation = keyframes`
  from {
    max-height: 0px;
  }
  to {
    max-height: 700px;
  }
`;

const collapseAnimation = keyframes`
  from {
    max-height: 700px;
  }
  to {
    max-height: 0px;
  }
`;

const StyledActionPanel = styled.div<{ expanded: boolean }>`
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} 300ms linear forwards
        `
      : css`
          ${collapseAnimation} 300ms linear forwards
        `};
  overflow: hidden;
  // background: ${({ theme }) => theme.colors.dropdown};
  display: flex;
  flex-direction: column-reverse;
  border-bottom: 1px solid #dee2e6;
  justify-content: center;
  padding: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`;
const StyledLeftDiv = styled.div``;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`;

type MediaBreakpoints = {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  isXxl: boolean;
};

interface ActionPanelProps {
  account: string;
  pool: DeserializedPool;
  userDataLoaded: boolean;
  expanded: boolean;
  breakpoints: MediaBreakpoints;
}

const InfoSection = styled(Box)`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  padding: 8px 8px;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0;
    flex-basis: 230px;
  }
`;
const BASE_BSC_SCAN_URL = "https://bscscan.com";
function getBscScanLink(
  data: string | number,
  type: "transaction" | "token" | "address" | "block" | "countdown",
  chainId: ChainId = ChainId?.MAINNET
): string {
  switch (type) {
    case "transaction": {
      // return `${BASE_BSC_SCAN_URLS[chainId]}/tx/${data}`;
      return BASE_BSC_SCAN_URL;
    }
    case "token": {
      // return `${BASE_BSC_SCAN_URLS[chainId]}/token/${data}`;
      return BASE_BSC_SCAN_URL;
    }
    case "block": {
      // return `${BASE_BSC_SCAN_URLS[chainId]}/block/${data}`;
      return BASE_BSC_SCAN_URL;
    }
    case "countdown": {
      // return `${BASE_BSC_SCAN_URLS[chainId]}/block/countdown/${data}`;
      return BASE_BSC_SCAN_URL;
    }
    default: {
      // return `${BASE_BSC_SCAN_URLS[chainId]}/address/${data}`;
      return BASE_BSC_SCAN_URL;
    }
  }
}

const ActionPanel: React.FC<ActionPanelProps> = ({ account, pool, userDataLoaded, expanded, breakpoints }) => {
  const {
    sousId,
    stakingToken,
    earningToken,
    totalStaked,
    startBlock,
    endBlock,
    stakingLimit,
    contractAddress,
    userData,
    isAutoVault,
  } = pool;
  // const { t } = useTranslation();
  const poolContractAddress = getAddress(contractAddress);
  const cakeVaultContractAddress = getCakeVaultAddress();
  // const { currentBlock } = useBlock();
  const currentBlock = 20;
  const { isXs, isSm, isMd } = breakpoints;
  const showSubtitle = (isXs || isSm) && sousId === 0;

  const { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay } =
    getPoolBlockInfo(pool, currentBlock);

  const isMetaMaskInScope = !!window.ethereum?.isMetaMask;
  const tokenAddress = earningToken.address || "";

  // const {
  //   totalCakeInVault,
  //   userData: { userShares },
  //   fees: { performanceFee },
  //   pricePerFullShare,
  // } = useCakeVault();
  const totalCakeInVault = 100;
  const pricePerFullShare = 18;
  const userShares = 10;
  // const fees : {}
  const performanceFee = { performanceFee: 20, callFee: 30, withdrawalFee: 40, withdrawalFeePeriod: 50 };
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO;
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO;
  const { cakeAsBigNumber } = convertSharesToCake(userShares, pricePerFullShare);
  const poolStakingTokenBalance = isAutoVault
    ? cakeAsBigNumber.plus(stakingTokenBalance)
    : stakedBalance.plus(stakingTokenBalance);

  const performanceFeeAsDecimal = performanceFee && performanceFee / 100;
  const isManualCakePool = sousId === 0;

  const getTotalStakedBalance = () => {
    if (isAutoVault) {
      return getBalanceNumber(totalCakeInVault, stakingToken?.decimals);
    }
    if (isManualCakePool) {
      const manualCakeTotalMinusAutoVault = new BigNumber(totalStaked).minus(totalCakeInVault);
      return getBalanceNumber(manualCakeTotalMinusAutoVault, stakingToken?.decimals);
    }
    return getBalanceNumber(totalStaked, stakingToken?.decimals);
  };

  const {
    targetRef: totalStakedTargetRef,
    tooltip: totalStakedTooltip,
    tooltipVisible: totalStakedTooltipVisible,
  } = useTooltip(
    "Total amount of %symbol% staked in this",
    pool,
    { symbol: stakingToken?.symbol },
    {
      placement: "bottom",
    }
  );

  const manualTooltipText = "You must harvest and compound your earnings from this pool manually.";
  const autoTooltipText =
    "Any funds you stake in this pool will be automagically harvested and restaked (compounded) for you.";

  const {
    targetRef: tagTargetRef,
    tooltip: tagTooltip,
    tooltipVisible: tagTooltipVisible,
  } = useTooltip(isAutoVault ? autoTooltipText : manualTooltipText, {
    placement: "bottom-start",
  });

  const maxStakeRow = stakingLimit ? (
    <Flex mb="8px" justifyContent="space-between">
      <Text>Max. stake per user:</Text>
      <Text>{`${getFullDisplayBalance(stakingLimit, stakingToken?.decimals, 0)} ${stakingToken?.symbol}`}</Text>
    </Flex>
  ) : null;

  const blocksRow =
    blocksRemaining || blocksUntilStart ? (
      <Flex mb="8px" justifyContent="space-between">
        <Text>{hasPoolStarted ? "Ends in" : "Starts in"}:</Text>
        <Flex>
          <Link external href={getBscScanLink(hasPoolStarted ? endBlock : startBlock, "countdown")}>
            <Balance fontSize="16px" value={blocksToDisplay} decimals={0} color="primary" />
            <Text ml="4px" color="primary" textTransform="lowercase">
              Blocks
            </Text>
            <TimerIcon ml="4px" color="primary" />
          </Link>
        </Flex>
      </Flex>
    ) : (
      <Skeleton width="56px" height="16px" />
    );

  const aprRow = (
    <Flex justifyContent="space-between" alignItems="center" mb="8px">
      <Text>{isAutoVault ? "APY" : "APR"}:</Text>
      <Apr
        pool={pool}
        showIcon
        stakedBalance={poolStakingTokenBalance}
        performanceFee={isAutoVault ? performanceFeeAsDecimal : 0}
      />
    </Flex>
  );

  const totalStakedRow = (
    <Flex justifyContent="space-between" alignItems="center" mb="8px">
      <Text maxWidth={["50px", "100%"]}>Total staked:</Text>
      <Flex alignItems="center">
        {totalStaked ? (
          <>
            <Balance fontSize="16px" value={getTotalStakedBalance()} decimals={0} unit={` ${stakingToken?.symbol}`} />
            <span ref={totalStakedTargetRef}>
              <HelpIcon color="textSubtle" width="20px" ml="4px" />
            </span>
          </>
        ) : (
          <Skeleton width="56px" height="16px" />
        )}
        {totalStakedTooltipVisible && totalStakedTooltip}
      </Flex>
    </Flex>
  );

  return (
    <StyledActionPanel expanded={expanded}>
      <StyledLeftDiv style={{ width: "19vw" }} />
      <InfoSection>
        {maxStakeRow}
        {(isXs || isSm) && aprRow}
        {(isXs || isSm || isMd) && totalStakedRow}
        {shouldShowBlockCountdown && blocksRow}
        <Flex mb="8px" justifyContent={["flex-end", "flex-end", "space-between"]}>
          {/* <LinkExternal href={`/info/token/${earningToken?.address}`} bold={false}>
            See Token Info
          </LinkExternal> */}
          <Text>총 예치 수량</Text>
          <Text>23,988,222,306</Text>
        </Flex>
        <Flex mb="8px" justifyContent={["flex-end", "flex-end", "space-between"]}>
          <Text>예치 자산</Text>
          <h1>
            <LinkExternal href={`/info/token/${earningToken?.address}`} bold={false}>
              DOODA
            </LinkExternal>
          </h1>
        </Flex>{" "}
        <Flex mb="8px" justifyContent={["flex-end", "flex-end", "space-between"]}>
          {/* <LinkExternal href={`/info/token/${earningToken?.address}`} bold={false}>
            See Token Info
          </LinkExternal> */}
          <Text>내 예치 자산</Text>
          <Text style={{ color: "#00af08" }}>$ 0</Text>
        </Flex>{" "}
        <Flex mb="8px" justifyContent={["flex-end", "flex-end", "space-between"]}>
          {/* <LinkExternal href={`/info/token/${earningToken?.address}`} bold={false}>
            See Token Info
          </LinkExternal> */}
          <Text>내 보상 자산</Text>
          <Text style={{ color: "#00af08" }}>$0.00</Text>
        </Flex>{" "}
        {/* <Flex mb="8px" justifyContent={["flex-end", "flex-end", "flex-start"]}>
          <LinkExternal href={`/info/token/${earningToken?.address}`} bold={false}>
            See Token Info
          </LinkExternal>
        </Flex>
        <Flex mb="8px" justifyContent={["flex-end", "flex-end", "flex-start"]}>
          <LinkExternal href={earningToken?.projectLink} bold={false}>
            View Project Site
          </LinkExternal>
        </Flex> */}
        {poolContractAddress && (
          <Flex mb="8px" mt="4px" justifyContent={["flex-end", "flex-end", "flex-end"]}>
            <Button
              variant="text"
              p="0"
              height="auto"
              // href={`${BASE_BSC_SCAN_URL}/address/${isAutoVault ? cakeVaultContractAddress : poolContractAddress}`}
              // bold={false}
            >
              <Text style={{ textDecoration: "underline" }}>View on BscScan</Text>
            </Button>
          </Flex>
        )}
        <Flex mb="8px" justifyContent={["flex-end", "flex-end", "flex-end"]}>
          <Button
            variant="text"
            p="0"
            height="auto"
            // onClick={() => registerToken(tokenAddress, earningToken?.symbol, earningToken?.decimals)}
          >
            <Text color="primary" style={{ textDecoration: "underline" }}>
              View Project Site
            </Text>
          </Button>
        </Flex>
        {/* {isAutoVault ? <CompoundingPoolTag /> : <ManualPoolTag />} */}
        {tagTooltipVisible && tagTooltip}
        {/* <span ref={tagTargetRef}>
          <HelpIcon ml="4px" width="20px" height="20px" color="textSubtle" />
        </span> */}
      </InfoSection>
      <ActionContainer>
        {/* {showSubtitle && (
          <Text mt="4px" mb="16px" color="textSubtle">
            {isAutoVault ? "Automatic restaking" : `"Earn DOODA`}
          </Text>
        )}
        {pool.isAutoVault ? (
          <AutoHarvest {...pool} userDataLoaded={userDataLoaded} />
        ) : (
          <Harvest {...pool} userDataLoaded={userDataLoaded} />
        )} */}
        <Stake pool={pool} userDataLoaded={userDataLoaded} />
      </ActionContainer>
    </StyledActionPanel>
  );
};

export default ActionPanel;
