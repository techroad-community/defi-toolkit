import React from "react";
// import {
//   TokenPairImage as UIKitTokenPairImage,
//   TokenPairImageProps as UIKitTokenPairImageProps,
//   TokenImage as UIKitTokenImage,
//   ImageProps,
// } from "@doodaswap/uikit";
import { Token, ChainId } from "@doodaswap/sdk";

import {
  TokenPairImage as UIKitTokenPairImage,
  TokenPairImageProps as UIKitTokenPairImageProps,
  TokenImage as UIKitTokenImage,
  ImageProps,
} from "../../../components/Image";

const { MAINNET, TESTNET } = ChainId;

const tokens = {
  wbnb: new Token(
    MAINNET,
    "0xCde538bd8954eAd01C56194F5C9905B310a5bd0E",
    18,
    "WBNB",
    "Wrapped BNB",
    "https://www.binance.com/"
  ),
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  bnb: new Token(MAINNET, "0xCde538bd8954eAd01C56194F5C9905B310a5bd0E", 18, "BNB", "BNB", "https://www.binance.com/"),
  cake: new Token(
    MAINNET,
    "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    18,
    "CAKE",
    "PancakeSwap Token",
    "https://pancakeswap.finance/"
  ),
  tlos: new Token(MAINNET, "0xb6C53431608E626AC81a9776ac3e999c5556717c", 18, "TLOS", "Telos", "https://www.telos.net/"),
  nft: new Token(MAINNET, "0x1fC9004eC7E5722891f5f38baE7678efCB11d34D", 6, "NFT", "APENFT", "https://apenft.org"),
  stephero: new Token(
    MAINNET,
    "0xE8176d414560cFE1Bf82Fd73B986823B89E4F545",
    18,
    "HERO",
    "StepHero",
    "https://stephero.io/"
  ),
};
// import tokens from "config/constants/tokens";

interface TokenPairImageProps extends Omit<UIKitTokenPairImageProps, "primarySrc" | "secondarySrc"> {
  primaryToken: Token;
  secondaryToken: Token;
}

const getImageUrlFromToken = (token: Token) => {
  const address = token.symbol === "BNB" ? tokens.wbnb.address : token.address;
  return `/images/tokens/${address}.svg`;
};

export const TokenPairImage: React.FC<TokenPairImageProps> = ({ primaryToken, secondaryToken, ...props }) => {
  return (
    <UIKitTokenPairImage
      primarySrc={getImageUrlFromToken(primaryToken)}
      secondarySrc={getImageUrlFromToken(secondaryToken)}
      {...props}
    />
  );
};

interface TokenImageProps extends ImageProps {
  token: Token;
}

export const TokenImage: React.FC<TokenImageProps> = ({ token, ...props }) => {
  return <UIKitTokenImage src={getImageUrlFromToken(token)} {...props} />;
};
