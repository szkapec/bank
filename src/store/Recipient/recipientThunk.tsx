import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IAddRecipient } from "./recipientInterface";
import { toast } from "react-toastify";
import { API } from "api/dev-api";
import { globalConfig } from "helpers/globalConfig";
import i18n from "util/initTranslation";

export const userRecipients = createAsyncThunk("RECIPIENTS_GET", async () => {
  try {
    const token = localStorage.getItem("jwtToken");
    const { config, userId } = globalConfig(token);
    const res = await axios.get(API.GET_USER_RECIPIENTS + userId, config);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    const message = i18n.t("global.somethingWentWrong")
    toast.error(message);
    console.log('error', error)
    return {
      message: error.response.data,
      error: true,
    };
  }
});

export const addUserRecipients = createAsyncThunk(
  "ADD_USER_RECIPIENTS",
  async (data: IAddRecipient) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const { config, userId } = globalConfig(token);
      const body = JSON.stringify({ ...data, id: userId });
      const res = await axios.put(API.PUT_ADD_RECIPIENTS, body, config);
      if (res.status === 200) {
        const message = i18n.t("recipients.addedNewRecipient")
        toast.success(message);
        return res.data;
      }
      return null;
    } catch (error) {
      const message = i18n.t("global.somethingWentWrong")
      toast.error(message);
      console.log(`error`, error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);

export const editUserRecipients = createAsyncThunk(
  "EDIT_USER_RECIPIENTS",
  async (data: IAddRecipient) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const { config, userId } = globalConfig(token);
      const body = JSON.stringify({ ...data, id: userId });
      const res = await axios.patch(API.PATCH_EDIT_RECIPIENTS, body, config);
      if (res.status === 200) {
        const message = i18n.t("recipients.editingWentFine")
        toast.success(message);
        return res.data;
      }
      return null;
    } catch (error) {
      const message = i18n.t("global.somethingWentWrong")
      toast.error(message);
      console.log(`error`, error);
  
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);

export const deleteUserRecipients = createAsyncThunk(
  "DELETE_USER_RECIPIENTS",
  async (recipientId: string) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const { config } = globalConfig(token);
      const res = await axios.delete(
        API.DELETE_RECIPIENTS + recipientId,
        config
      );
      if (res.status === 200) {
        const message = i18n.t("recipients.recipientDeleted")
        toast.success(message);
        return res.data;
      }
      const messageError = i18n.t("global.somethingWentWrong")
      toast.error(messageError);
      return null;
    } catch (error) {
      const messageError = i18n.t("global.somethingWentWrong")
      toast.error(messageError);
      console.log(`error`, error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);
