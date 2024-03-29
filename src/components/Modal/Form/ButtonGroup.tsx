import { Button, ButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IModalButton } from "store/Recipient/recipientInterface";

const ButtonGroupCompomnent = ({ buttons }: IModalButton) => {
  const { t } = useTranslation();

  return (
    <>
      <ButtonGroup
        sx={{
          marginTop: 3,
          color: "red",
        }}
        size="small"
        variant="outlined"
        aria-label="outlined button group"
      >
        {buttons.map(({ disabled, variant, name }) => (
          <Button disabled={disabled} variant={variant}>
            {t(name)}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};

export default ButtonGroupCompomnent;
