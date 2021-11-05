import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Web3Provider } from "@ethersproject/providers";
import sample from "lodash/sample";
// import { simpleRpcProvider } from "utils/providers";
// eslint-disable-next-line import/no-unresolved
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";

// Array of available nodes to connect to
export const nodes = [
  process.env.REACT_APP_NODE_1,
  process.env.REACT_APP_NODE_2,
  process.env.REACT_APP_NODE_3,
  // process.env.REACT_APP_NODE_4,
];

// import getRpcUrl from "utils/getRpcUrl";
const getNodeUrl = () => {
  return sample(nodes);
};

const RPC_URL = getNodeUrl();
console.log("rpc url =", RPC_URL);

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setProvider] = useState(library || simpleRpcProvider);

  useEffect(() => {
    if (library !== refEth.current) {
      setProvider(library || simpleRpcProvider);
      refEth.current = library;
    }
  }, [library]);

  return { library: provider, chainId: chainId ?? parseInt(process.env.REACT_APP_CHAIN_ID, 10), ...web3React };
};

export default useActiveWeb3React;
