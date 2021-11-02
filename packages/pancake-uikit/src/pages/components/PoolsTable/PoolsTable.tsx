import React, { useRef } from "react";
import styled from "styled-components";
import { background } from "styled-system";
import { Button } from "../../../components/Button";
import { ChevronUpIcon } from "../../../components/Svg";
// import { useTranslation } from "contexts/Localization";
import { DeserializedPool } from "../../state/types";
import PoolRow from "./PoolRow";

interface PoolsTableProps {
  pools: DeserializedPool[];
  userDataLoaded: boolean;
  account: string;
}

// const StyledTable = styled.div`
//   //   border-radius: ${({ theme }) => theme.radii.card};
//   //   border-radius: 4px;
//   scroll-margin-top: 64px;

//   background-color: ${({ theme }) => theme.card.background};
//   > div:not(:last-child) {
//     border-bottom: 2px solid ${({ theme }) => theme.colors.disabled};
//   }
// `;

const StyledTableBorder = styled.div`
  //   border-radius: ${({ theme }) => theme.radii.card};
  border-raius: 4px;
  background-color: ${({ theme }) => theme.colors.cardBorder};
  padding: 1px 1px 3px 1px;
  background-size: 400% 400%;
`;

const StyledButton = styled(Button)`
  border-radius: 2px;
`;

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  margin: 16px 0px;
`;

const TableWrapper = styled.div`
  overflow: visible;
  scroll-margin-top: 64px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`;
const TableHead = styled.thead`
  &tr {
    td {
      color: red;
    }
  }
`;

const TableContainer = styled.div`
  position: relative;
`;

const StyledTr = styled.tr`
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder};
`;
const StyledThTr = styled.div`
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.cardBorder};
  height: 4rem;
  display: flex;
  justify-content: space-between;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
  td {
    padding-top: 1.2rem;
    padding-left: 2rem !important;
    color: #4d5560;
    font-size: 14px;
    line-height: 26px;
    letter-spacing: -0.8px;
    color: #4d5560;
    // padding-left: 1.1rem;
    margin-left: 7rem;
  }
`;

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const PoolsTable: React.FC<PoolsTableProps> = ({ pools, userDataLoaded, account }) => {
  //   const { t } = useTranslation();
  const tableWrapperEl = useRef<HTMLDivElement>(null);
  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    // <StyledTableBorder>
    //   <StyledTable id="pools-table" role="table" ref={tableWrapperEl}>
    //     <TableHead>
    //       <StyledThTr>
    //         {poolTableTh.map((thRow) => (
    //           <td>{thRow}</td>
    //         ))}
    //       </StyledThTr>
    //     </TableHead>
    //     {pools.map((pool: any) => (
    //       <PoolRow
    //         key={pool.isAutoVault ? "auto-cake" : pool.sousId}
    //         pool={pool}
    //         account={account}
    //         userDataLoaded={userDataLoaded}
    //       />
    //     ))}
    //     <ScrollButtonContainer>
    //       <StyledButton variant="text" onClick={scrollToTop}>
    //         To Top
    //         <ChevronUpIcon color="primary" />
    //       </StyledButton>
    //     </ScrollButtonContainer>
    //   </StyledTable>
    // </StyledTableBorder>
    <Container id="farms-table">
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <TableHead>
              <StyledThTr>
                {poolTableTh.map((thRow) => (
                  <td>{thRow}</td>
                ))}
              </StyledThTr>
            </TableHead>
            <TableBody>
              <>
                {pools.map((pool: any) => (
                  <PoolRow
                    key={pool.isAutoVault ? "auto-cake" : pool.sousId}
                    pool={pool}
                    account={account}
                    userDataLoaded={userDataLoaded}
                  />
                ))}
              </>
            </TableBody>
          </StyledTable>
        </TableWrapper>
        <ScrollButtonContainer>
          <Button variant="text" onClick={scrollToTop}>
            To Top
            <ChevronUpIcon color="doodaPrimary" />
          </Button>
        </ScrollButtonContainer>
      </TableContainer>
    </Container>
  );
};

const poolTableTh = ["Token", "APR", "Deposited Assets", "DOODA Rewards", ""];
export default PoolsTable;
