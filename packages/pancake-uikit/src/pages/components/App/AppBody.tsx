import React from "react";
import styled from "styled-components";
import { Card } from "../../../index";

export const BodyWrapper = styled(Card)`
  max-width: 456px;
  margin-top: 3rem;
  width: 100%;
  z-index: 1;
`;

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>;
}
