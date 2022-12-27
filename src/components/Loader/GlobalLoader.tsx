import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./loader.scss";
import { Box } from "@mui/material";
import TextWrapper from "components/Contents/TextWrapper";

interface IProps {
  messages?: string[];
  noBackground?: boolean;
}

interface IDataMessage {
  text: string;
  time: number;
}

const GlobalLoader = ({ messages, noBackground }: IProps) => {

  return (
    <Box className={`global-loader ${noBackground ? "none" : ""}`}>
      <CircularProgress color="secondary" size={62} />
      {messages?.map((message, index) => (
        <TimeMessage key={message} text={message} time={index * 1000} />
      ))}
      {!messages && (
        <Box className="global-loader__loading">
          <TextWrapper label="global.checkData" />
        </Box>
      )}
    </Box>
  );
};

const TimeMessage = ({ text, time }: IDataMessage) => {
  const [data, setData] = useState(false);
  setTimeout(() => {
    setData(true);
  }, time);

  return data ? <div className="global-loader__data">{text}</div> : <></>;
};

export default GlobalLoader;