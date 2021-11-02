import React, { useState } from "react";
import styled from "styled-components";
import noop from "lodash/noop";
/* eslint-disable import/no-unresolved */
import { Meta } from "@storybook/react/types-6-0";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import ToggleView from "../components/ToggleView/ToogleView";

// import { useTranslation } from "../contexts/Localization";
import Page from "../components/Layout/Page";

import { Text } from "../../components/Text";
import { Flex } from "../../components/Box";
import { Image } from "../../components/Image";
import SearchInput from "../components/SearchInput";
import PoolTabButtons from "../components/TabButtons";
import { Checkbox } from "../../components/Checkbox";
import PoolsTable from "../components/PoolsTable/PoolsTable";

import {
  DoodaStyledPageHeader,
  DoodaFarmHeading,
  DoodaFarmText,
  ControlContainer,
  ViewControls,
  ViewControlsRight,
  LabelWrapper,
  SearchIcon,
  ToggleWrapper,
  StyledText,
} from "./styles";

const Row = styled.div`
  margin-bottom: 32px;
`;

const chosenPools = [
  {
    contractAddress: {
      "56": "0xbdda50183d817c3289f895a4472eb475967dc980",
      "96": "0xbdda50183d817c3289f895a4472eb475967dc980",
    },
    earningToken: {
      address: "0xbdda50183d817c3289f895a4472eb475967dc980",
      chainId: 97,
      decimals: 18,
      name: "DoodaSwap token",
      projectLink: "https://dev-doodaswap-frontend.vercel.app/",
      symbol: "DOODA",
    },
    harvest: true,
    isAutoVault: false,
    isFinished: false,
    poolCategory: "Core",
    sortOrder: 1,
    sousId: 0,
    stakingLimit: 200,
    stakingToken: {
      address: "0xbdda50183d817c3289f895a4472eb475967dc980",
      chainId: "97",
      decimals: 18,
      name: "DoodaSwap Token",
      projectLink: "https://dev-doodaswap-frontend.vercel.app/",
      symbol: "DOODA",
    },
    tokenPerBlock: 10,
    totalStaked: 50,
    userData: {
      allowance: 200,
      pendingReward: 20,
      stakedBalance: 50,
      stakingTokenBalance: 400,
    },
  },
  {
    contractAddress: {
      "56": "0xbdda50183d817c3289f895a4472eb475967dc980",
      "96": "0xbdda50183d817c3289f895a4472eb475967dc980",
    },
    earningToken: {
      address: "0xbdda50183d817c3289f895a4472eb475967dc980",
      chainId: 97,
      decimals: 18,
      name: "DoodaSwap token",
      projectLink: "https://dev-doodaswap-frontend.vercel.app/",
      symbol: "DOODA",
    },
    harvest: true,
    isAutoVault: false,
    isFinished: false,
    poolCategory: "Core",
    sortOrder: 1,
    sousId: 0,
    stakingLimit: 200,
    stakingToken: {
      address: "0xbdda50183d817c3289f895a4472eb475967dc980",
      chainId: "97",
      decimals: 18,
      name: "DoodaSwap Token",
      projectLink: "https://dev-doodaswap-frontend.vercel.app/",
      symbol: "DOODA",
    },
    tokenPerBlock: 10,
    totalStaked: 50,
    userData: {
      allowance: 200,
      pendingReward: 20,
      stakedBalance: 50,
      stakingTokenBalance: 400,
    },
  },
  {
    contractAddress: {
      "56": "0xbdda50183d817c3289f895a4472eb475967dc980",
      "96": "0xbdda50183d817c3289f895a4472eb475967dc980",
    },
    earningToken: {
      address: "0xbdda50183d817c3289f895a4472eb475967dc980",
      chainId: 97,
      decimals: 18,
      name: "DoodaSwap token",
      projectLink: "https://dev-doodaswap-frontend.vercel.app/",
      symbol: "DOODA",
    },
    harvest: true,
    isAutoVault: false,
    isFinished: false,
    poolCategory: "Core",
    sortOrder: 1,
    sousId: 0,
    stakingLimit: 200,
    stakingToken: {
      address: "0xbdda50183d817c3289f895a4472eb475967dc980",
      chainId: "97",
      decimals: 18,
      name: "DoodaSwap Token",
      projectLink: "https://dev-doodaswap-frontend.vercel.app/",
      symbol: "DOODA",
    },
    tokenPerBlock: 10,
    totalStaked: 50,
    userData: {
      allowance: 200,
      pendingReward: 20,
      stakedBalance: 50,
      stakingTokenBalance: 400,
    },
  },
  {
    contractAddress: {
      "56": "0xbdda50183d817c3289f895a4472eb475967dc980",
      "96": "0xbdda50183d817c3289f895a4472eb475967dc980",
    },
    earningToken: {
      address: "0xbdda50183d817c3289f895a4472eb475967dc980",
      chainId: 97,
      decimals: 18,
      name: "DoodaSwap token",
      projectLink: "https://dev-doodaswap-frontend.vercel.app/",
      symbol: "DOODA",
    },
    harvest: true,
    isAutoVault: false,
    isFinished: false,
    poolCategory: "Core",
    sortOrder: 1,
    sousId: 0,
    stakingLimit: 200,
    stakingToken: {
      address: "0xbdda50183d817c3289f895a4472eb475967dc980",
      chainId: "97",
      decimals: 18,
      name: "DoodaSwap Token",
      projectLink: "https://dev-doodaswap-frontend.vercel.app/",
      symbol: "DOODA",
    },
    tokenPerBlock: 10,
    totalStaked: 50,
    userData: {
      allowance: 200,
      pendingReward: 20,
      stakedBalance: 50,
      stakingTokenBalance: 400,
    },
  },
  {
    contractAddress: {
      "56": "0xbdda50183d817c3289f895a4472eb475967dc980",
      "96": "0xbdda50183d817c3289f895a4472eb475967dc980",
    },
    earningToken: {
      address: "0xbdda50183d817c3289f895a4472eb475967dc980",
      chainId: 97,
      decimals: 18,
      name: "DoodaSwap token",
      projectLink: "https://dev-doodaswap-frontend.vercel.app/",
      symbol: "DOODA",
    },
    harvest: true,
    isAutoVault: false,
    isFinished: false,
    poolCategory: "Core",
    sortOrder: 1,
    sousId: 0,
    stakingLimit: 200,
    stakingToken: {
      address: "0xbdda50183d817c3289f895a4472eb475967dc980",
      chainId: "97",
      decimals: 18,
      name: "DoodaSwap Token",
      projectLink: "https://dev-doodaswap-frontend.vercel.app/",
      symbol: "DOODA",
    },
    tokenPerBlock: 10,
    totalStaked: 50,
    userData: {
      allowance: 200,
      pendingReward: 20,
      stakedBalance: 50,
      stakingTokenBalance: 400,
    },
  },
];
export enum ViewMode {
  TABLE = "TABLE",
  CARD = "CARD",
}
export default {
  title: "Pages/Pools",
  // component: Pools,
  argTypes: {},
} as Meta;

export const Default: React.FC = () => {
  //   const [viewMode, setViewMode] = useState<Enumerator>("LIST");
  const [viewMode, setViewMode] = useState(undefined);
  const [query, setQuery] = useState("");
  const [stakedOnly, setStakedOnly] = useState<boolean>(false);
  const stakedInactiveFarms: string[] = ["pool1", "pool2", "pool3"];
  const account = "0xa4285e33B838892C6e0597cC6B112651097a4D2b";
  const userDataLoaded = true;
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const tableLayout = <PoolsTable pools={chosenPools} account={account} userDataLoaded={userDataLoaded} />;
  //   const { t } = useTranslation();
  return (
    <>
      <BrowserRouter>
        <DoodaStyledPageHeader>
          <Flex flex="2" flexDirection={["row", null, null, "row"]} alignItems={["center", null, null, "center"]}>
            <Flex
              flex="2"
              flexDirection={["column", null, null, "column"]}
              alignItems={["flex-start", null, null, "flex-start"]}
            >
              <DoodaFarmHeading as="h1" scale="xxl" color="doodaPrimary" mb="24px">
                Dooda Pools
              </DoodaFarmHeading>
              <DoodaFarmText scale="lg" color="doodaText">
                Just stake some tokens to earn.
                <br />
                High APR, low risk.
              </DoodaFarmText>
            </Flex>
            <Image src="https://i.ibb.co/FxNZ9WZ/Screenshot-from-2021-10-30-17-20-58.png" width={400} height={350} />
          </Flex>
        </DoodaStyledPageHeader>
        <Page>
          <ControlContainer>
            <ViewControls>
              <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            </ViewControls>
            <ViewControlsRight>
              <LabelWrapper style={{ marginLeft: 16 }}>
                <SearchIcon style={{ display: "block" }}>
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 16C9.77498 15.9996 11.4988 15.4054 12.897 14.312L17.293 18.708L18.707 17.294L14.311 12.898C15.405 11.4997 15.9996 9.77544 16 8C16 3.589 12.411 0 8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16ZM8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2Z"
                      fill="#636C7D"
                    />
                  </svg>
                </SearchIcon>
                {/* <Text textTransform="uppercase">Search</Text> */}
                <SearchInput onChange={handleChangeQuery} placeholder="Search Pools" />
              </LabelWrapper>

              <PoolTabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} />
              <ToggleWrapper>
                <Checkbox
                  id="staked-only-farms"
                  name="confirmed"
                  type="checkbox"
                  onChange={() => setStakedOnly(!stakedOnly)}
                  scale="sm"
                />

                <StyledText> Staked</StyledText>
              </ToggleWrapper>
              <ToggleWrapper>
                <Checkbox
                  id="staked-only-farms"
                  name="confirmed"
                  type="checkbox"
                  onChange={() => setStakedOnly(!stakedOnly)}
                  scale="sm"
                />

                <StyledText> DFO</StyledText>
              </ToggleWrapper>
            </ViewControlsRight>
          </ControlContainer>
          {/* {renderContent()} */}
          {tableLayout}
          {/* {account && !userDataLoaded && stakedOnly && (
            <Flex justifyContent="center">
              <Loading />
            </Flex>
          )} */}
          {/* <div ref={observerRef} /> */}
          {/* <Image src="/images/decorations/3dpan.png" alt="Pancake illustration" width={120} height={103} /> */}
        </Page>
      </BrowserRouter>
    </>
  );
};

const handleClick = noop;

// export const WithHandler: React.FC = () => {
//   return (
//     <div style={{ padding: "32px", width: "400px" }}>
//       <Row>
//         <Alert onClick={handleClick} title="Info" />
//       </Row>
//       <Row>
//         <Alert onClick={handleClick} title="Success" variant="success">
//           A description of the success alert
//         </Alert>
//       </Row>
//       <Row>
//         <Alert onClick={handleClick} title="Danger A Long Title" variant="danger" />
//       </Row>
//       <Row>
//         <Alert onClick={handleClick} title="Warning" variant="warning" />
//       </Row>
//     </div>
//   );
// };

// function useUserFarmsViewMode(): [ViewMode, (viewMode: ViewMode) => void] {
//   console.log("Hello");
//   console.log(viewMode, "hey mj");
//   const dispatch = useDispatch<AppDispatch>();
//   const userFarmsViewMode = useSelector<AppState, AppState["user"]["userFarmsViewMode"]>((state) => {
//     return state.user.userFarmsViewMode;
//   });
//   const setUserFarmsViewMode = useCallback(
//     (viewMode: ViewMode) => {
//       dispatch(updateUserFarmsViewMode({ userFarmsViewMode: viewMode }));
//     },
//     [dispatch]
//   );
//   return [userFarmsViewMode, setUserFarmsViewMode];
// }
