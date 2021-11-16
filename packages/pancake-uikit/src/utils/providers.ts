import { ethers } from "ethers";
import getRpcUrl from "./getRpcUrl";

const RPC_URL = getRpcUrl();
console.log("rpc url =", RPC_URL);

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);

export default null;
