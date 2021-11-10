import styled from "styled-components";
import { StyledMenuItemProps } from "./types";

export const StyledMenuItemContainer = styled.div<StyledMenuItemProps>`
  position: relative;

  ${({ $isActive, $variant, theme }) =>
    $isActive &&
    $variant === "subMenu" &&
    `
      padding: 10px 4rem;
      text-align:center;
      background: #3763A4;
      border-radius: 2px;
      color:#fff;
      &:before{
        content: "";
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
        // background-color: ${theme.colors.doodaPrimary}; // shows the underline of menu items // previous = theme.colors.primary
        border-radius: 2px 2px 0 0;
      }
    `};
  ${({ $isActive, $variant, theme }) =>
    !$isActive &&
    $variant === "subMenu" &&
    `
      padding: 10px 4rem;
      text-align:center;
      background: #fff;
      border-radius: 2px;
      color:#fff;
      &:before{
        content: "";
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
        border-radius: 2px 2px 0 0;
      }
    `};
`;

const StyledMenuItem = styled.a<StyledMenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  color: ${({ theme, $isActive, $variant }) => ($variant === "default" ? theme.colors.doodaPrimary : "#fff")};
  color: ${({ theme, $isActive, $variant }) => ($isActive && $variant !== "default" ? "#fff" : "")};
  color: ${({ theme, $isActive, $variant }) => (!$isActive && $variant !== "default" ? theme.colors.doodaDark : "")};

  border-bottom: ${({ theme, $isActive }) => ($isActive ? `3px solid ${theme.colors.doodaPrimary}` : "0px")};
  opacity: ${({ $isActive, $variant }) => ($isActive || $variant === "subMenu" ? "1" : "0.6")};
  font-size: 16px;
  font-weight: ${({ $isActive, $variant }) => ($isActive && $variant === "default" ? "600" : "400")};
  ${({ $statusColor, theme }) =>
    $statusColor &&
    `
    &:after {
      content: "";
      border-radius: 100%;
      background: ${theme.colors[$statusColor]};
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

  ${({ $variant }) =>
    $variant === "default"
      ? `
    padding: 0 16px;
    height: 48px;
  `
      : `
    padding: 4px 4px 0px 4px;
    height: 42px;
  `}

  ${({ $variant }) => $variant === "subMenu" && "color:#fff"}

  &:hover {
    // background: ${({ theme }) => theme.colors.tertiary};
    // ${({ $variant }) => $variant === "default" && "border-radius: 16px;"};
    // border-bottom: 3px solid ${({ theme }) => theme.colors.doodaPrimary};
  }
`;

export default StyledMenuItem;
