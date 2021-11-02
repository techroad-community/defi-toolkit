// import React, { useMemo } from "react";
// import styled from "styled-components";
// import { Pair } from "@doodaswap/sdk";
// // import { Text, Flex, CardBody, CardFooter, Button, AddIcon } from '@doodaswap/uikit'
// import { Text } from "../../components/Text";
// import { Flex } from "../../components/Box";
// import { CardBody, CardFooter } from "../../components/Card";
// import { Button } from "../../components/Button";
// import { AddIcon } from "../../components/Svg";
// import { Link } from "react-router-dom";

// import { useTranslation } from "../../contexts/Localization";
// import useActiveWeb3React from "../../hooks/useActiveWeb3React";
// import FullPositionCard from "../../components/PositionCard";
// import { useTokenBalancesWithLoadingIndicator } from "../../state/wallet/hooks";
// import { usePairs } from "../../hooks/usePairs";
// import { toV2LiquidityToken, useTrackedTokenPairs } from "../../state/user/hooks";
// import Dots from "../../components/Loader/Dots";
// import { AppHeader, AppBody } from "../../components/App";
// import Page from "../Page";

// const Body = styled(CardBody)`
//   // background-color: ${({ theme }) => theme.colors.dropdownDeep};
//   background-color: #fff;
// `;
// const StyledBtn = styled(Button)`
//   border-radius: 2px;
//   color: #fff;
//   padding: 1rem 3rem;
//   background-color: ${({ theme }) => theme.colors.doodaPrimary};
// `;

// const StyledSecondaryButton = styled(Button)`
//   color: #4d5560;
//   border-radius: 2rem;
//   border: 2px solid #4d5560;
//   padding: 1rem 1.5rem;
//   margin-top: 1rem;
//   margin-bottom: 1rem;
// `;
// const StyledSwapTipContainer = styled.div`
//   background-color: ${({ theme }) => theme.colors.doodaPrimary};
//   padding: 2rem 2rem;
//   text-align: center;
//   position: relative;
// `;
// const TipIcon = styled.div`
//   position: absolute;
//   top: 1rem;
//   left: 0.5rem;
// `;

// export default function Pool() {
//   const { account } = useActiveWeb3React();
//   const { t } = useTranslation();

//   // fetch the user's balances of all tracked V2 LP tokens
//   const trackedTokenPairs = useTrackedTokenPairs();
//   const tokenPairsWithLiquidityTokens = useMemo(
//     () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
//     [trackedTokenPairs]
//   );
//   const liquidityTokens = useMemo(
//     () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
//     [tokenPairsWithLiquidityTokens]
//   );
//   const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
//     account ?? undefined,
//     liquidityTokens
//   );

//   // fetch the reserves for all V2 pools in which the user has a balance
//   const liquidityTokensWithBalances = useMemo(
//     () =>
//       tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
//         v2PairsBalances[liquidityToken.address]?.greaterThan("0")
//       ),
//     [tokenPairsWithLiquidityTokens, v2PairsBalances]
//   );

//   const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens));
//   const v2IsLoading =
//     fetchingV2PairBalances ||
//     v2Pairs?.length < liquidityTokensWithBalances.length ||
//     v2Pairs?.some((V2Pair) => !V2Pair);

//   const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair));

//   const renderBody = () => {
//     if (!account) {
//       return (
//         <Text color="doodaPrimary" textAlign="center">
//           {t("Connect to a wallet to view your liquidity.")}
//         </Text>
//       );
//     }
//     if (v2IsLoading) {
//       return (
//         <Text color="doodaPrimary" textAlign="center">
//           <Dots>{t("Loading")}</Dots>
//         </Text>
//       );
//     }
//     if (allV2PairsWithLiquidity?.length > 0) {
//       return allV2PairsWithLiquidity.map((v2Pair, index) => (
//         <FullPositionCard
//           key={v2Pair.liquidityToken.address}
//           pair={v2Pair}
//           mb={index < allV2PairsWithLiquidity.length - 1 ? "16px" : 0}
//         />
//       ));
//     }
//     return (
//       <Text color="doodaPrimary" textAlign="center">
//         {t("No liquidity found.")}
//       </Text>
//     );
//   };

//   return (
//     <Page>
//       <AppBody>
//         <AppHeader title={t("Your Liquidity")} subtitle={t("Remove liquidity to receive tokens back")} />
//         <Body>
//           {renderBody()}
//           {account && !v2IsLoading && (
//             <Flex flexDirection="column" alignItems="center" mt="24px">
//               <Text color="doodaPrimary" mb="8px">
//                 {t("Don't see a pool you joined?")}
//               </Text>
//               <StyledSecondaryButton id="import-pool-link" variant="secondary" scale="sm" as={Link} to="/find">
//                 {t("Find other LP tokens")}
//               </StyledSecondaryButton>
//             </Flex>
//           )}
//         </Body>
//         <CardFooter style={{ textAlign: "center" }}>
//           <StyledBtn id="join-pool-button" as={Link} to="/add" width="100%" startIcon={<AddIcon color="white" />}>
//             {t("Add Liquidity")}
//           </StyledBtn>
//         </CardFooter>
//       </AppBody>
//     </Page>
//   );
// }
