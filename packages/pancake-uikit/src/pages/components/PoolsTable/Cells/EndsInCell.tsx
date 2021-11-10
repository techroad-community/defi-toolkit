import React from "react";
import styled from "styled-components";
import BigNumber from "bignumber.js";
// import { getBscScanLink } from "utils";
import { DeserializedPool } from "../../../state/types";
import { useBlock } from "../../../state/hooks/hooks";

import { Flex } from "../../../../components/Box";
import { Link } from "../../../../components/Link";
import { Skeleton } from "../../../../components/Skeleton";
import { Text } from "../../../../components/Text";
import { TimerIcon } from "../../../../components/Svg";
import Balance from "../../Balance";
// import { useTranslation } from "contexts/Localization";
import { getPoolBlockInfo } from "../../../helpers";
import { BaseCell, CellContent } from "./BaseCell";

interface FinishCellProps {
  pool: DeserializedPool;
}

const StyledCell = styled(BaseCell)`
  flex: 2 0 100px;
`;

const EndsInCell: React.FC<FinishCellProps> = ({ pool }) => {
  const { sousId, totalStaked, startBlock, endBlock, isFinished } = pool;
  console.log(pool, "this is poool");
  // const { currentBlock } = useBlock();
  const currentBlock = 20;
  // const currentBlock = new BigNumber(123.4567);
  // console.log(currentBlock, "this is current block");
  // const { t } = useTranslation();
  const BscScanLik = "https://bscscan.com/address/0x749805cd06710596bf5eec6f8a0b196785be18f0";

  const { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay } =
    getPoolBlockInfo(pool, currentBlock);

  const isCakePool = sousId === 0;

  const renderBlocks = shouldShowBlockCountdown ? (
    <Flex alignItems="center">
      <Flex flex="1.3">
        <Balance fontSize="16px" value={blocksToDisplay} decimals={0} />
        <Text ml="4px" textTransform="lowercase">
          Blocks
        </Text>
      </Flex>
      <Flex flex="1">
        <Link
          external
          // href={getBscScanLink(hasPoolStarted ? endBlock : startBlock, "countdown")}
          href={BscScanLik}
          onClick={(e) => e.stopPropagation()}
        >
          <TimerIcon ml="4px" />
        </Link>
      </Flex>
    </Flex>
  ) : (
    <Text>-</Text>
  );

  // A bit hacky way to determine if public data is loading relying on totalStaked
  // Opted to go for this since we don't really need a separate publicDataLoaded flag
  // anywhere else
  // const isLoadingPublicData = !totalStaked.gt(0) || !currentBlock || (!blocksRemaining && !blocksUntilStart);
  const isLoadingPublicData = !currentBlock || (!blocksRemaining && !blocksUntilStart);
  const showLoading = isLoadingPublicData && !isCakePool && !isFinished;
  return (
    // <StyledCell role="cell">
    //   <CellContent>
    //     <Text fontSize="12px" color="textSubtle" textAlign="left">
    //       {hasPoolStarted || !shouldShowBlockCountdown ? "Ends in" : "Starts in"}
    //     </Text>
    //     {showLoading ? <Skeleton width="80px" height="16px" /> : renderBlocks}
    //   </CellContent>
    // </StyledCell>
    <StyledCell role="cell">
      <CellContent>
        {/* <Text fontSize="12px" color="textSubtle" textAlign="left">
          {hasPoolStarted || !shouldShowBlockCountdown ? "Ends in" : "Starts in"}
        </Text> */}
        {pool?.userData?.pendingReward}
      </CellContent>
    </StyledCell>
  );
};

export default EndsInCell;
