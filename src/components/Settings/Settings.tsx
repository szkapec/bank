import { useQuery } from "react-query";
import { useAppDispatch } from "store/hooks";
import { userLoaded } from "store/Login/loginThunk";
import { ServerSendEvent } from "./ServerSendEvent";
import { selectorAuthLoginId } from "store/Login/loginSelector";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Settings = () => {
  const dispatch = useAppDispatch();
  const userIdSelector = useSelector(selectorAuthLoginId);
  useQuery("login", () => dispatch(userLoaded()));

  useEffect(() => {
    userIdSelector && ServerSendEvent(dispatch, userIdSelector);
  }, [userIdSelector]);

  return <></>;
};

export default Settings;
