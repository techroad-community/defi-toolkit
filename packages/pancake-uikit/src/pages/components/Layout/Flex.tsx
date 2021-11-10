import styled from "styled-components";

const FlexLayout = styled.div`
  display: flex;
  border: none;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 300px;
    max-width: 33.33%;
    width: 100%;
    // margin: 0 8px;
    margin-bottom: 0px;
  }
`;

export default FlexLayout;
