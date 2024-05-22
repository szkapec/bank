import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import TextWrapper from "components/Contents/TextWrapper";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/hooks";
import { selectorLanguage } from "store/Login/loginSelector";
import { loginChangeUserLanguage } from "store/Login/loginThunk";

enum languageEnum {
  PL = "pl_PL",
  EN = "en_EN",
  SP = "sp_SP",
  GR = "gr_GR",
}

interface IProps {
  setOffer: Function;
}

const ChangeLanguage = ({ setOffer }: IProps) => {
  const [language, setLanguage] = React.useState("");
  const languageSelector = useSelector(selectorLanguage);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as languageEnum);
  };
  const onSubmit = () => {
    const test = {
      language,
      t: 'test'
    }
    dispatch(loginChangeUserLanguage(language));
    setOffer(false)
  };

  return (
    <Box sx={styleLanguage}>
      <Box sx={{ padding: "0px 0 15px" }}>
        <TextWrapper label="offer.changeLanguage" />
      </Box>
      <FormControl>
        <InputLabel id="language">
          <TextWrapper label="offer.language" />
        </InputLabel>
        <Select
          sx={{ width: "180px", margin: "10px 0 20px" }}
          labelId="language"
          value={language || languageSelector}
          label="language"
          onChange={handleChange}
        >
          <MenuItem value={languageEnum.PL}>
            <TextWrapper label="offer.poland" />
          </MenuItem>
          <MenuItem value={languageEnum.EN}>
            <TextWrapper label="offer.england" />
          </MenuItem>
          <MenuItem value={languageEnum.SP}>
            <TextWrapper label="offer.spain" />
          </MenuItem>
          <MenuItem value={languageEnum.GR}>
            <TextWrapper label="offer.germany" />
          </MenuItem>
        </Select>
        <Button
          onClick={onSubmit}
          className="btn-change"
          type="submit"
          variant="contained"
        >
          <TextWrapper label="offer.changeLanguageName" />
        </Button>
      </FormControl>
    </Box>
  );
};

export default ChangeLanguage;

const styleLanguage = {
  display: "flex",
  flexDirection: "column",
  width: "200px",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px auto",
};
