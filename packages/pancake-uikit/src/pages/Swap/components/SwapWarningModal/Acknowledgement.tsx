import React, { useState } from "react";
// import { useTranslation } from "contexts/Localization";
import { Text } from "../../../../components/Text";
import { Flex } from "../../../../components/Box";
import { Checkbox } from "../../../../components/Checkbox";
import { Button } from "../../../../components/Button";
// import { Text, Flex, Checkbox, Button } from "@doodaswap/uikit";

interface AcknowledgementProps {
  handleContinueClick: () => void;
}

const Acknowledgement: React.FC<AcknowledgementProps> = ({ handleContinueClick }) => {
  //   const { t } = useTranslation();
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <Checkbox
            name="confirmed"
            type="checkbox"
            checked={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
            scale="sm"
          />
          <Text ml="10px" style={{ userSelect: "none" }}>
            I understand
          </Text>
        </Flex>

        <Button disabled={!isConfirmed} onClick={handleContinueClick}>
          Continue
        </Button>
      </Flex>
    </>
  );
};

export default Acknowledgement;
