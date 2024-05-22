import React, { useEffect } from "react"
import { useQuery } from "react-query";
import { useAppDispatch } from "store/hooks";
import { loginUserLoaded } from "store/Login/loginThunk";
import { ServerSendEvent } from "./ServerSendEvent";
import {
  selectorAuthLoginId,
  selectorLanguage,
} from "store/Login/loginSelector";
import { useSelector } from "react-redux";
import { initTranslation } from "util/initTranslation";
import { getConnectAccount } from "store/SubAccount/subAccountThunk";

const Settings = () => {
  const languageSelector = useSelector(selectorLanguage);

  initTranslation(languageSelector);

  const dispatch = useAppDispatch();
  const userIdSelector = useSelector(selectorAuthLoginId);
  useQuery("login", () => dispatch(loginUserLoaded()));

  useEffect(() => {
    userIdSelector && ServerSendEvent(dispatch, userIdSelector);
    userIdSelector && dispatch(getConnectAccount())
    //
  }, [userIdSelector]);

  return <></>;
};

export default React.memo(Settings);
