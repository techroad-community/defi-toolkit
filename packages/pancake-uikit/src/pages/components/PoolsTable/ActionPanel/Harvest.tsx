import React from "react";

import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import { PoolCategory, DeserializedPool } from "../../../state/types";
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from "../../../utils/formatBalance";
// import { useTranslation } from "../../../contexts/Localization";
import Balance from "../../Balance";
import { BIG_ZERO } from "../../../utils/bigNumber";
import { Button } from "../../../../components/Button";
import { Text } from "../../../../components/Text";
import { useModal } from "../../../../widgets/Modal";
import { Flex } from "../../../../components/Box";
import { Skeleton } from "../../../../components/Skeleton";
import { Heading } from "../../../../components/Heading";

import { ActionContainer, ActionTitles, ActionContent } from "./styles";
// import CollectModal from "../../PoolCard/Modals/CollectModal";

interface HarvestActionProps extends DeserializedPool {
  userDataLoaded: boolean;
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({
  sousId,
  poolCategory,
  earningToken,
  userData,
  userDataLoaded,
  earningTokenPrice,
}) => {
  // const { t } = useTranslation();
  const { account } = useWeb3React();

  // const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO;
  // const earningTokenBalance = getBalanceNumber(earnings, earningToken?.decimals);
  // const earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken?.decimals);
  const earningTokenDollarBalance = 100;
  const earningTokenBalance = 18;
  // const hasEarnings = earnings.gt(0);
  const hasEarnings = true;
  // const fullBalance = getFullDisplayBalance(earnings, earningToken?.decimals);
  const fullBalance = 10;
  // const formattedBalance = formatNumber(earningTokenBalance, 3, 3);
  const formattedBalance = 100;
  const isCompoundPool = sousId === 0;
  const isBnbPool = poolCategory === PoolCategory.BINANCE;

  // const [onPresentCollect] = useModal(
  //   <CollectModal
  //     formattedBalance={formattedBalance}
  //     fullBalance={fullBalance}
  //     earningToken={earningToken}
  //     earningsDollarValue={earningTokenDollarBalance}
  //     sousId={sousId}
  //     isBnbPool={isBnbPool}
  //     isCompoundPool={isCompoundPool}
  //   />
  // );

  const actionTitle = (
    <>
      <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
        {earningToken?.symbol}{" "}
      </Text>
      <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
        Earned
      </Text>
    </>
  );

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Heading>0</Heading>
          <Button disabled>{isCompoundPool ? "Collect" : "Harvest"}</Button>
        </ActionContent>
      </ActionContainer>
    );
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Skeleton width={180} height="32px" marginTop={14} />
        </ActionContent>
      </ActionContainer>
    );
  }

  return (
    <ActionContainer>
      <ActionTitles>{actionTitle}</ActionTitles>
      <ActionContent>
        <Flex flex="1" pt="16px" flexDirection="column" alignSelf="flex-start">
          <>
            {hasEarnings ? (
              <>
                <Balance lineHeight="1" bold fontSize="20px" decimals={5} value={earningTokenBalance} />
                {earningTokenPrice! > 0 && (
                  <Balance
                    display="inline"
                    fontSize="12px"
                    color="textSubtle"
                    decimals={2}
                    prefix="~"
                    value={earningTokenDollarBalance}
                    unit=" USD"
                  />
                )}
              </>
            ) : (
              <>
                <Heading color="textDisabled">0</Heading>
                <Text fontSize="12px" color="textDisabled">
                  0 USD
                </Text>
              </>
            )}
          </>
        </Flex>
        <Button
          disabled={!hasEarnings}
          // onClick={onPresentCollect}
        >
          {isCompoundPool ? "Collect" : "Harvest"}
        </Button>
      </ActionContent>
    </ActionContainer>
  );
};

export default HarvestAction;
