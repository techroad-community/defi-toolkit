import React, { useState, useMemo } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import { Input } from "../../../components/Input";
// import { useTranslation } from "../../contexts/Localization";

const StyledInput = styled(Input)`
  border-radius: 16px;
  border: 1px solid #99a2ab;
  margin-left: auto;
  border-radius: 100px;
  &:focus {
    outline: 0 !important;
  }
  &:focus:not(:disabled) {
    // box-shadow: ${({ theme }) => theme.shadows.focus};
    box-shadow: none;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
s  }
`;

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<Props> = ({ onChange: onChangeCallback, placeholder = "Search" }) => {
  const [searchText, setSearchText] = useState("");

  // const { t } = useTranslation();

  const debouncedOnChange = useMemo(
    () => debounce((e: React.ChangeEvent<HTMLInputElement>) => onChangeCallback(e), 500),
    [onChangeCallback]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    debouncedOnChange(e);
  };

  return (
    <InputWrapper>
      <StyledInput
        style={{ paddingLeft: "2.3rem", width: "100%" }}
        value={searchText}
        onChange={onChange}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};

export default SearchInput;
