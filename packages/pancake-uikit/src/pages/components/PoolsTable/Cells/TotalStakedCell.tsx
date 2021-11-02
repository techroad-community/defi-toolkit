import React, { useMemo } from "react";
import styled from "styled-components";
import BigNumber from "bignumber.js";
import { useSelector } from "react-redux";

import { Flex } from "../../../../components/Box";
import { Skeleton } from "../../../../components/Skeleton";
import { Text } from "../../../../components/Text";

// import { Flex, Skeleton, Text } from '@doodaswap/uikit'
import { useTranslation } from "../../../contexts/Localization";
import Balance from "../../Balance";
import { DeserializedPool, State } from "../../../state/types";

// import { useCakeVault } from "state/pools/hooks";
import { getBalanceNumber } from "../../../utils/formatBalance";
import { BaseCell, CellContent } from "./BaseCell";

interface TotalStakedCellProps {
  pool: DeserializedPool;
}

const StyledCell = styled(BaseCell)`
  flex: 2 0 100px;
`;

const TotalStakedCell: React.FC<TotalStakedCellProps> = ({ pool }) => {
  // const { t } = useTranslation();
  const { sousId, stakingToken, totalStaked, isAutoVault } = pool;
  // const { totalCakeInVault } = useCakeVault();
  const totalCakeInVault = 20;

  const isManualCakePool = sousId === 0;

  const totalStakedBalance = useMemo(() => {
    if (isAutoVault) {
      return getBalanceNumber(totalCakeInVault, stakingToken?.decimals);
    }
    if (isManualCakePool) {
      const manualCakeTotalMinusAutoVault = new BigNumber(totalStaked).minus(totalCakeInVault);
      return getBalanceNumber(manualCakeTotalMinusAutoVault, stakingToken?.decimals);
    }
    return getBalanceNumber(totalStaked, stakingToken?.decimals);
  }, [isAutoVault, totalCakeInVault, isManualCakePool, totalStaked, stakingToken?.decimals]);
  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          Total staked
        </Text>
        {totalStaked ? (
          <Flex height="20px" alignItems="center">
            <Balance fontSize="16px" value={totalStakedBalance} decimals={0} unit={` ${stakingToken?.symbol}`} />
          </Flex>
        ) : (
          <Skeleton width="80px" height="16px" />
        )}
      </CellContent>
    </StyledCell>
  );
};

export default TotalStakedCell;
