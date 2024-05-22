import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "api/dev-api";
import axios from "axios";
import { IAdminGetUser } from "./adminInterface";
import i18n from "util/initTranslation";
import { toast } from "react-toastify";

const host = process.env.REACT_APP_HOST;

export const GetUsersAdmin = createAsyncThunk(
  "GET_USERS",
  async (formData: IAdminGetUser) => {
    const token = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = JSON.stringify(formData);
    try {
      const res = await axios.post(API.POST_ADMIN_USER, body, config);
      if (res.status === 200) {
        return res.data;
      }
      return;
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
