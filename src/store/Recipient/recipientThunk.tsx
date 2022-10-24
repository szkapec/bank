import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthenticationToken from "../../util/setAuthenticationToken";
const host = process.env.REACT_APP_HOST;

const useToken = (token: string) => {
  if(token){
     localStorage.removeItem('jwtToken');
     localStorage.setItem('jwtToken', token)
  } else {
    console.log('Brak tokena :>> ', );
    localStorage.removeItem('jwtToken');
  }
}

export const userRecipients = createAsyncThunk("RECIPIENTS", async () => {
  const token = localStorage.getItem("jwtToken");
  let userId = null;
  if (token) {
    userId = setAuthenticationToken();
  } else {
    userId = null;
    return;
  }

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.get(`${host}/api/recipient/${userId}`, config);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log(`error`, error);
    return {
      message: error.response.data,
      error: true,
    };
  }
});
