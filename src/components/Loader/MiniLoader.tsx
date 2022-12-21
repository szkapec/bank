import React from "react";
import { CircularProgress } from "@mui/material";
interface IProps {
  size?: number
}

const MiniLoader = ({ size = 22 }: IProps) => {
  return <CircularProgress color="info" size={size} />;
};

export default MiniLoader;
