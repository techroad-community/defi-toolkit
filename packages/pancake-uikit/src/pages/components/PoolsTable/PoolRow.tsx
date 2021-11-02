import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useMatchBreakpoints from "../../../hooks/useMatchBreakpoints";
import { DeserializedPool } from "../../state/types";
// import useDelayedUnmount from "hooks/useDelayedUnmount";
import NameCell from "./Cells/NameCell";
import EarningsCell from "./Cells/EarningsCell";
import AprCell from "./Cells/AprCell";
import TotalStakedCell from "./Cells/TotalStakedCell";
import EndsInCell from "./Cells/EndsInCell";
import { ChevronDownIcon } from "../../../components/Svg";
// import ExpandActionCell from "./Cells/ExpandActionCell";
import ActionPanel from "./ActionPanel/ActionPanel";
// import AutoEarningsCell from "./Cells/AutoEarningsCell";
import AutoAprCell from "./Cells/AutoAprCell";

interface PoolRowProps {
  pool: DeserializedPool;
  account: string;
  userDataLoaded: boolean;
}

const StyledRow = styled.tr`
  background-color: transparent;
  display: flex;
  flex-directiion: row;
  //   width: 68.5vw;
  justify-content: space-between;
  padding: 0rem 2rem;
  border-bottom: 2px solid #dee2e6;
  cursor: pointer;
`;

const PoolRow: React.FC<PoolRowProps> = ({ pool, account, userDataLoaded }) => {
  const { isXs, isSm, isMd, isLg, isXl, isXxl, isTablet, isDesktop } = useMatchBreakpoints();
  const isLargerScreen = isLg || isXl || isXxl;
  const [expanded, setExpanded] = useState(false);
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <StyledRow onClick={toggleExpanded}>
        <td>
          <NameCell pool={pool} />
        </td>
        {/* {pool.isAutoVault ? (
          <AutoEarningsCell pool={pool} account={account} userDataLoaded={userDataLoaded} />
        ) : (
          <EarningsCell pool={pool} account={account} userDataLoaded={userDataLoaded} />
        )} */}
        <td>{pool.isAutoVault ? <AutoAprCell pool={pool} /> : <AprCell pool={pool} />}</td>
        <td>{isLargerScreen && <TotalStakedCell pool={pool} />}</td>
        <td>{isDesktop && <EndsInCell pool={pool} />}</td>
        <td>
          <ChevronDownIcon color="doodaDark" />
        </td>
      </StyledRow>
      <tr>
        <td>
          {shouldRenderActionPanel && (
            <ActionPanel
              account={account}
              pool={pool}
              userDataLoaded={userDataLoaded}
              expanded={expanded}
              breakpoints={{ isXs, isSm, isMd, isLg, isXl, isXxl }}
            />
          )}
        </td>
      </tr>
    </>
  );
};

const useDelayedUnmount = (isMounted: boolean, delayTime: number) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
};
export default PoolRow;
