import { Token } from "@doodaswap/sdk";
import tokens from "./tokens";

const { bondly, safemoon } = tokens;

interface WarningTokenList {
  [key: string]: Token;
}

const SwapWarningTokens = <WarningTokenList>{
  safemoon,
  bondly,
};

export default SwapWarningTokens;
