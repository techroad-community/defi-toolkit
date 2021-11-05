// import { Flex, Text } from '@doodaswap/uikit'
import styled from "styled-components";
import { Flex } from "../../../../components/Box";
import { Text } from "../../../../components/Text";

export const BaseCell = styled.div`
  color: black;

  padding: 24px 8px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const CellContent = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  max-height: 40px;
  ${Text} {
    line-height: 1;
  }
`;

// export default BaseCell;