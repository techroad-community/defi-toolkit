import React, { useState, useContext } from "react";
import { ThemeContext as StyledThemeContext } from "styled-components";
// import { useThemeManager } from "state/user/hooks";

const useTheme = () => {
  //   const [isDark, toggleTheme] = useThemeManager();
  const [isDark, toggleTheme] = useState<boolean>(false);

  const theme = useContext(StyledThemeContext);
  return { isDark, theme, toggleTheme };
};

export default useTheme;
