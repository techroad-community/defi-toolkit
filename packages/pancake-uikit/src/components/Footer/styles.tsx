import styled from "styled-components";
// import { darkColors } from "../../theme/colors";
import { darkColors, doodaDarkColors } from "../../theme/colors";
import { Box, Flex } from "../Box";
import SocialLinks from "./Components/SocialLinks";

export const StyledFooter = styled(Flex)`
  // background: ${darkColors.backgroundAlt};
  background: ${doodaDarkColors.backgroundLightDark};
  // background: red;
`;

export const StyledList = styled.ul`
  list-style: none;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
  }
`;

export const StyledListItem = styled.li`
  margin-bottom: 8px;
  text-transform: capitalize;

  &:first-child {
    color: ${doodaDarkColors.footerTextColor};
    font-size: 16px !important;
    font-weight: 600;
    text-transform: uppercase;
    font-family: Spoqa Han Sans Neo;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 28px;
    /* identical to box height, or 175% */

    letter-spacing: -0.02em;
  }
`;

export const StyledIconMobileContainer = styled(Box)`
  margin-bottom: 24px;
`;

export const StyledToolsContainer = styled(Flex)`
  border-color: ${darkColors.cardBorder};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  padding: 24px 0;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-width: 0;
    border-bottom-width: 0;
    padding: 0 0;
    margin-bottom: 0;
  }
`;

export const StyledSocialLinks = styled(SocialLinks)`
  // border-bottom: 1px solid ${darkColors.cardBorder};
  margin-top: 1.6rem;
  padding-top: 1rem !important;
  content-align: right;
`;

export const FooterSubMenu = styled.h3`
  color: ${doodaDarkColors.footerTextColor};
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: -0.02em;
`;
