import React from "react";
import { ChainId, Token } from "@doodaswap/sdk";
import { TokenPairImage, ImageProps } from "../../../../components/Image";

// import { TokenPairImage, ImageProps } from "@doodaswap/uikit";
// import { mainnetTokens } from "config/constants/tokens";
const { MAINNET, TESTNET } = ChainId;

const mainnetTokens = {
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
const DoodaVaultTokenPairImage: React.FC<Omit<ImageProps, "src">> = (props) => {
  const primaryTokenSrc = `/images/tokens/${mainnetTokens.cake.address}.svg`;

  return <TokenPairImage primarySrc={primaryTokenSrc} secondarySrc="/images/tokens/autorenew.svg" {...props} />;
};

export default DoodaVaultTokenPairImage;
