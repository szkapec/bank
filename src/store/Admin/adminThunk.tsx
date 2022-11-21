import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IAdminGetUser } from "./adminInterface";

const host = process.env.REACT_APP_HOST;

export const GetUsersAdmin = createAsyncThunk(
  "GET_USERS",
  async (formData: IAdminGetUser) => {
    console.log("formData :>> ", formData);
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
      const res = await axios.post(`${host}/api/admin/users`, body, config);
      if (res.status === 200) {
        return res.data;
      }
      return;
    } catch (error) {
      console.log(`error`, error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);
