import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import { ButtonMenu, ButtonMenuItem } from "../../../components/ButtonMenu";
import { NotificationDot } from "../../../components/NotificationDot";
import { Button } from "../../../components/Button";
// import { ButtonMenu, ButtonMenuItem, NotificationDot, Button } from "@doodaswap/uikit";

// import { useTranslation } from "contexts/Localization";

interface FarmTabButtonsProps {
  hasStakeInFinishedFarms: boolean;
}

const PoolTabButtons: React.FC<FarmTabButtonsProps> = ({ hasStakeInFinishedFarms }) => {
  //   const { url } = useRouteMatch();
  const pathname = "/farms";
  //   const location = useLocation();
  //   const { t } = useTranslation();

  let activeIndex;
  switch (pathname) {
    case "/farms":
      activeIndex = 0;
      break;
    // case "/farms/history":
    //   activeIndex = 1;
    //   break;
    // case "/farms/archived":
    //   activeIndex = 2;
    //   break;
    default:
      activeIndex = 0;
      break;
  }

  return (
    <Wrapper>
      <StyledButtonMenu scale="sm" variant="subtle">
        {/* <StyledButtonMenuItem as={Link} to={`${url}`}> */}
        <StyledButtonMenuItem as={Link} to="#">
          Active
        </StyledButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedFarms}>
          {/* <StyledButtonMenuItemInactive id="finished-farms-button" as={Link} to={`${url}/history`}> */}
          <StyledButtonMenuItemInactive id="finished-farms-button" as={Link} to="#">
            Inactive
          </StyledButtonMenuItemInactive>
        </NotificationDot>
      </StyledButtonMenu>
    </Wrapper>
  );
};

export default PoolTabButtons;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    padding-left: 12px;
    padding-right: 12px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 16px;
  }
`;
const StyledButtonMenu = styled(ButtonMenu)`
  border: none;
  width: 100%;
  background: none;
  border-radius: ${({ theme }) => theme.radii.doodaCard};
`;

const StyledButtonMenuItem = styled(ButtonMenuItem)`
  background-color: #3763a4;
  padding: 0.5rem 5rem;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.8px;
  color: #f1f3f5;
  margin-right: 1rem;
`;

const StyledButtonMenuItemInactive = styled(StyledButtonMenuItem)`
  background: #ffffff;
  color: ${({ theme }) => theme.colors.doodaPrimary};
  background: #e9ecef;
  border-radius: 2px;
`;
