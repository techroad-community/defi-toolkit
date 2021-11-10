import styled from "styled-components";
import PageHeader from "../components/PageHeader";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { Image } from "../../components/Image";

export const DoodaStyledPageHeader = styled(PageHeader)`
  background: #ffffff;
  min-height: 30vh;
`;
export const DoodaFarmHeading = styled(Heading)`
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 36px;
  letter-spacing: -0.8px;
`;

export const DoodaFarmText = styled(Heading)`
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 24px;
  letter-spacing: -0.8px;
  color: #99a2ab;
`;

export const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 40px;
  background: #ffffff;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 4px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`;

export const LabelWrapper = styled.div`
  position: relative;
  > ${Text} {
    font-size: 12px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`;

export const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  height: 3.5rem;
  align-items: center;
  width: 20% !important;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`;
export const ViewControlsRight = styled.div`
  float: right;
  display: flex;
  flex-direction: row;
  padding-right: 1rem;
  width: 70%;
  justify-content: space-between;
`;

export const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`;
export const SearchIcon = styled.div`
  position: absolute;
  top: 13% !important;
  padding-left: 1rem;
  padding-top: 0.3rem;
  z-index: 100;
  width: 25px;
`;
export const StyledText = styled(Text)`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #99a2ab;
`;
