import React from "react";
import styled from "styled-components";
import { Box } from "../Box";
import MenuItem from "../MenuItem/MenuItem";
import StyledSubMenuItems from "./styles";
import { SubMenuItemsProps } from "./types";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px;
  background: #ffffff;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.09);
  border-radius: 4px;
`;

const SubMenuItems: React.FC<SubMenuItemsProps> = ({ items = [], activeItem, ...props }) => {
  return (
    <StyledSubMenuItems justifyContent={["start", null, "center"]} {...props} pl={["12px", null, "0px"]}>
      <StyledContainer>
        {items.map(
          ({ label, href }) =>
            label && (
              <Box key={label} mr="20px">
                <MenuItem href={href} isActive={href === activeItem} variant="subMenu">
                  {label}
                </MenuItem>
              </Box>
            )
        )}
      </StyledContainer>
    </StyledSubMenuItems>
  );
};

export default SubMenuItems;
