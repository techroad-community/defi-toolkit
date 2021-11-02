import React from "react";
import styled from "styled-components";
import { Text } from "../../../../components/Text";
import useMatchBreakpoints from "../../../../hooks/useMatchBreakpoints";
// import { Text, useMatchBreakpoints } from '@doodaswap/uikit'
import { DeserializedPool } from "../../../state/types";
// import { useCakeVault } from "state/pools/hooks";
// import { useTranslation } from "contexts/Localization";
import { BaseCell, CellContent } from "./BaseCell";
import Apr from "../Apr";
// import { convertSharesToCake } from "../../../helpers";

interface AprCellProps {
  pool: DeserializedPool;
}

const StyledCell = styled(BaseCell)`
  flex: 1 0 50px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex: 0 0 120px;
  }
`;

const AutoAprCell: React.FC<AprCellProps> = ({ pool }) => {
  // const { t } = useTranslation();
  // const { isMobile } = useMatchBreakpoints();
  const isMobile = false;

  // const {
  //   userData: { userShares },
  //   fees: { performanceFee },
  //   pricePerFullShare,
  // } = useCakeVault();

  // const { cakeAsBigNumber } = convertSharesToCake(userShares, pricePerFullShare);
  // const performanceFeeAsDecimal = performanceFee && performanceFee / 100;

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          APY
        </Text>
        <Apr
          pool={pool}
          // stakedBalance={cakeAsBigNumber}
          stakedBalance={100}
          // performanceFee={performanceFeeAsDecimal}
          performanceFee={10}
          showIcon={!isMobile}
        />
      </CellContent>
    </StyledCell>
  );
};

export default AutoAprCell;
