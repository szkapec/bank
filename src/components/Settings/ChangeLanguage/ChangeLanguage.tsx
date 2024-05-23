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
  const dispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as languageEnum);
  };
  const onSubmit = () => {
    dispatch(loginChangeUserLanguage(language));
    setOffer(false)
  };

  return (
    <Box sx={styleLanguage}>
      <Box sx={{ padding: "0px 0 15px" }}>
        <TextWrapper label="settings.changeLanguage" />
      </Box>
      <FormControl>
        <InputLabel id="language">
          <TextWrapper label="settings.language" />
        </InputLabel>
        <Select
          sx={{ width: "180px", margin: "10px 0 20px" }}
          labelId="language"
          value={language || languageSelector}
          label="language"
          onChange={handleChange}
        >
          <MenuItem value={languageEnum.PL}>
            <TextWrapper label="settings.poland" />
          </MenuItem>
          <MenuItem value={languageEnum.EN}>
            <TextWrapper label="settings.england" />
          </MenuItem>
          <MenuItem disabled value={languageEnum.SP}>
            <TextWrapper label="settings.spain" />
          </MenuItem>
          <MenuItem disabled value={languageEnum.GR}>
            <TextWrapper label="settings.germany" />
          </MenuItem>
        </Select>
        <Button
          onClick={onSubmit}
          className="btn-change"
          type="submit"
          variant="contained"
        >
          <TextWrapper label="settings.changeLanguageName" />
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
