import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IAddRecipient } from "./recipientInterface";
import { toast } from "react-toastify";
import { API } from "api/dev-api";
// import { useTranslation } from "react-i18next";
import { globalConfig } from "helpers/globalConfig";

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
    // const { t } = useTranslation();
    toast.error("recipients.somethingWentWrong", error);
    return {
      message: error.response.data,
      error: true,
    };
  }
});

export const addUserRecipients = createAsyncThunk(
  "ADD_USER_RECIPIENTS",
  async (data: IAddRecipient) => {
    // const { t } = useTranslation();
    try {
      const token = localStorage.getItem("jwtToken");
      const { config, userId } = globalConfig(token);
      const body = JSON.stringify({ ...data, id: userId });
      const res = await axios.put(API.PUT_ADD_RECIPIENTS, body, config);
      if (res.status === 200) {
        toast.success("recipients.addedNewRecipient");
        return res.data;
      }
      return null;
    } catch (error) {
      console.log(`error`, error);
      toast.error("recipients.somethingWentWrong", error);
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
    // const { t } = useTranslation();
    try {
      const token = localStorage.getItem("jwtToken");
      const { config, userId } = globalConfig(token);
      const body = JSON.stringify({ ...data, id: userId });
      const res = await axios.patch(API.PATCH_EDIT_RECIPIENTS, body, config);
      if (res.status === 200) {
        toast.success("recipients.editingWentFine");
        return res.data;
      }
      return null;
    } catch (error) {
      console.log(`error`, error);
      toast.error("recipients.somethingWentWrong", error);
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
    // const { t } = useTranslation();
    try {
      const token = localStorage.getItem("jwtToken");
      const { config } = globalConfig(token);
      const res = await axios.delete(
        API.DELETE_RECIPIENTS + recipientId,
        config
      );
      if (res.status === 200) {
        toast.success("recipients.recipientDeleted");
        return res.data;
      }
      toast.error("recipients.somethingWentWrong");
      return null;
    } catch (error) {
      console.log(`error`, error);
      toast.error("recipients.somethingWentWrong", error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);
