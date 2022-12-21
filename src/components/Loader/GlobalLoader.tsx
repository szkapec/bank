import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./loader.scss";
import { Box } from "@mui/material";

interface IProps {
  messages?: string[];
  noBackground?: boolean;
}

const GlobalLoader = ({ messages, noBackground }: IProps) => {
  console.log("noBackground :>> ", noBackground);

  return (
    <Box className={`global-loader ${noBackground ? "none" : ""}`}>
      <CircularProgress color="secondary" size={62} />
      {messages?.map((message, index) => (
        <TimeMessage key={message} text={message} time={index * 1000} />
      ))}
      {!messages && (
        <Box className="global-loader__loading">Sprawdzam dane...</Box>
      )}
    </Box>
  );
};

export default GlobalLoader;

const TimeMessage = ({ text, time }: any) => {
  const [data, setData] = useState(false);

  setTimeout(() => {
    setData(true);
  }, time);

  return data ? <div className="global-loader__data">{ text }</div> : <></>;
};
