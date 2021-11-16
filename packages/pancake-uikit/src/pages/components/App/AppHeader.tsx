import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Text, Flex, Heading, IconButton, ArrowBackIcon, NotificationDot } from "../../../index";
import { useExpertModeManager } from "../../../state/user/hooks";
import GlobalSettings from "../Menu/GlobalSettings";
// import Transactions from "./Transactions";
// import QuestionHelper from "../QuestionHelper";

interface Props {
  title: string;
  subtitle: string;
  helper?: string;
  backTo?: string;
  noConfig?: boolean;
}

const AppHeaderContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;
const StyledHeading = styled(Heading)`
  letter-spacing: -0.8px;
  color: #4d5560;
  font-family: Roboto;
  font-weight: 600;
`;

const AppHeader: React.FC<Props> = ({ title, subtitle, helper, backTo, noConfig = false }) => {
  const [expertMode] = useExpertModeManager();

  return (
    <AppHeaderContainer>
      <Flex alignItems="center" mr={noConfig ? 0 : "16px"}>
        {backTo && (
          <IconButton as={Link} to={backTo}>
            <ArrowBackIcon width="32px" />
          </IconButton>
        )}
        <Flex flexDirection="column">
          <StyledHeading as="h2" mb="8px">
            {title}
          </StyledHeading>
          <Flex alignItems="center">
            {/* {helper && <QuestionHelper text={helper} mr="4px" placement="top-start" />} */}
            {/* <Text color="textSubtle" fontSize="14px">
              {subtitle}
            </Text> */}
          </Flex>
        </Flex>
      </Flex>
      {!noConfig && (
        <Flex alignItems="center">
          <NotificationDot show={expertMode}>
            <GlobalSettings />
          </NotificationDot>
          {/* <Transactions /> */}
        </Flex>
      )}
    </AppHeaderContainer>
  );
};

export default AppHeader;
