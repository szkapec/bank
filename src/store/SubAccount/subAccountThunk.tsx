import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sleep } from "helpers/sleep";
import { toast } from "react-toastify";
import { IConnectAccount } from "./subAccountInterface";
import i18n from "util/initTranslation";
import { globalConfig } from "helpers/globalConfig";

const host = process.env.REACT_APP_HOST;

export const newConnectAccount = createAsyncThunk(
  "NEW_CONNECT_ACCOUNT",
  async ({ login, password }: IConnectAccount) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };

    const body = JSON.stringify({ email: login, password });
    try {
      const res = await axios.post(
        `${host}/api/users/new-connect-account`,
        body,
        config
      );

      if (res.status === 200) {
        const message = i18n.t("global.accountHasBeenLinked");
        await sleep();
        await toast.success(message);
        return await res.data;
      }
      return;
    } catch (error) {
      const message = i18n.t("global.somethingWentWrong");
      toast.success(message);
      console.log(`error`, error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);

export const getConnectAccount = createAsyncThunk(
  "GET_CONNECT_ACCOUNT",
  async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    try {
      const res = await axios.get(`${host}/api/users/connect-account`, config);
      if (res.status === 200) {
        return res.data;
      }
      return;
    } catch (error) {
      const message = i18n.t("global.somethingWentWrong");
      toast.error(message);
      console.log(`error`, error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);

export const separateAccount = createAsyncThunk(
  "SEPARATE_ACCOUNT",
  async ({ login, password }: IConnectAccount) => {
    const token = localStorage.getItem("jwtToken");
    const { config } = globalConfig(token);
    const body = JSON.stringify({ email: login, password });
    try {
      const res = await axios.post(
        `${host}/api/users/separate-account`,
        body,
        config
      );

      if (res.status === 200) {
        const message = i18n.t(res.data.message);
        console.log('message', res)
        toast.success(message);
        return res.data;
      }
      return;
    } catch (error) {
      const message = i18n.t(error.response.data.message);
      toast.error(message);
      console.log(`error`, error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);
