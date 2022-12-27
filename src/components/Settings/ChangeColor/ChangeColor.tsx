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
import { selectorColor } from "store/Login/loginSelector";
import { loginChangeUserLanguage } from "store/Login/loginThunk";

enum EnumColor {
  LIGHT = "light",
  DARK = "dark",
}

interface IProps {
  setOffer: Function;
}

const ChangeColor = ({ setOffer }: IProps) => {
  const [color, setColor] = React.useState("");
  const colorSelector = useSelector(selectorColor);

  const dispatch = useAppDispatch();
  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as EnumColor);
  };
  const onSubmit = () => {
    dispatch(loginChangeUserLanguage(color));
    setOffer(false);
  };

  return (
    <Box sx={styleColor}>
      <Box sx={{ padding: "0px 0 15px" }}>
        <TextWrapper label="Zmień kolor" />
      </Box>
      <FormControl>
        <InputLabel id="color">
          <TextWrapper label="offer.chooseColor" />
        </InputLabel>
        <Select
          sx={{ width: "180px", margin: "10px 0 20px" }}
          labelId="color"
          value={color || colorSelector}
          label="color"
          onChange={handleChange}
        >
          <MenuItem value={EnumColor.LIGHT}>
            <TextWrapper label="offer.light" />
          </MenuItem>
          <MenuItem disabled={true} value={EnumColor.DARK}>
            <TextWrapper label="offer.dark" />
          </MenuItem>
        </Select>
        <Button
          onClick={onSubmit}
          className="btn-change"
          type="submit"
          variant="contained"
        >
          <TextWrapper label="offer.choose" />
        </Button>
      </FormControl>
    </Box>
  );
};

export default ChangeColor;

const styleColor = {
  display: "flex",
  flexDirection: "column",
  width: "200px",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px auto",
};
