import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "api/dev-api";
import axios from "axios";
import { globalConfig } from "helpers/globalConfig";
import { toast } from "react-toastify";


  export const homeHighChartsThunk = createAsyncThunk(
    "HOME_HIGH_CHARTS",
    async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const { config, userId } = globalConfig(token);
        const body = JSON.stringify({  id: userId });
        const res = await axios.get(process.env.REACT_APP_HOST + '/api/history-transfer', config);
        if (res.status === 200) {
          return res.data;
        }
        return null;
     
      } catch (error) {
        toast.error("recipients.somethingWentWrong", error);
        return {
          message: error.response.data,
          error: true,
        };
      }
    }
  );