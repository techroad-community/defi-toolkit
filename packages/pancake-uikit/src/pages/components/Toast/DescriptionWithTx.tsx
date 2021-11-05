import React from "react";
// import { getBscScanLink } from "utils";
import { ChainId } from "@doodaswap/sdk";
// import { useTranslation } from "contexts/Localization";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { Link } from "../../../components/Link";
import { Text } from "../../../components/Text";

interface DescriptionWithTxProps {
  description?: string;
  txHash?: string;
}

const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: "https://bscscan.com",
  [ChainId.TESTNET]: "https://testnet.bscscan.com",
};
const truncateHash = (address: string, startLength = 4, endLength = 4) => {
  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
};
const DescriptionWithTx: React.FC<DescriptionWithTxProps> = ({ txHash, children }) => {
  const { chainId } = useActiveWeb3React();
  // const { t } = useTranslation();

  return (
    <>
      {typeof children === "string" ? <Text as="p">{children}</Text> : children}
      {txHash && (
        <Link external href={getBscScanLink(txHash, "transaction", chainId)}>
          View on BscScan: {truncateHash(txHash, 8, 0)}
        </Link>
      )}
    </>
  );
};

function getBscScanLink(
  data: string | number,
  type: "transaction" | "token" | "address" | "block" | "countdown",
  chainId: ChainId = ChainId.MAINNET
): string {
  switch (type) {
    case "transaction": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/tx/${data}`;
    }
    case "token": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/token/${data}`;
    }
    case "block": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/block/${data}`;
    }
    case "countdown": {
      return `${BASE_BSC_SCAN_URLS[chainId]}/block/countdown/${data}`;
    }
    default: {
      return `${BASE_BSC_SCAN_URLS[chainId]}/address/${data}`;
    }
  }
}

export default DescriptionWithTx;
