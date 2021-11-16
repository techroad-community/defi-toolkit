/* eslint-disable import/no-unresolved */
import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import SwapPage from "./swap";
import Providers from "./Providers";

export default {
  title: "Pages/Swap",
  component: SwapPage,
  argTypes: {
    activeItem: {
      options: ["Trade", "Earn", "Win"],
      control: { type: "select" },
    },
    Hname: {
      options: "",
      control: { type: "input" },
    },
  },
} as Meta;

interface SwapProps {
  name: string;
  address: string;
}
const defaultProps = {
  name: "Hello",
  address: "World",
};

const HelloSwap: React.FC<SwapProps> = (args) => {
  // return <SwapPage />;
  return (
    <Providers>
      <SwapPage history={undefined} location={undefined} match={undefined} />
    </Providers>
  );
};

export const ConnectedSwap = HelloSwap.bind({});
ConnectedSwap.args = defaultProps;
