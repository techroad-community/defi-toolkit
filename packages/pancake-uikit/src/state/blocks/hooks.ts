import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line import/no-unresolved
import useIsWindowVisible from "../../hooks/useIsWindowVisible";
import { simpleRpcProvider } from "../../utils/providers";
import { useAppDispatch } from "../index";

import { setBlock } from ".";
import { State } from "../types";

export const usePollBlockNumber = () => {
  // eslint-disable-next-line no-bitwise
  const timer = useRef({});
  const dispatch = useAppDispatch();
  const isWindowVisible = useIsWindowVisible();

  useEffect(() => {
    if (isWindowVisible) {
      timer.current = setInterval(async () => {
        const blockNumber = await simpleRpcProvider.getBlockNumber();
        dispatch(setBlock(blockNumber));
      }, 6000);
    } else {
      // clearInterval(timer.current);
    }

    // return () => clearInterval(timer.current);
  }, [dispatch, timer, isWindowVisible]);
};

export const useBlock = () => {
  return useSelector((state: State) => state.block);
};

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock);
};
