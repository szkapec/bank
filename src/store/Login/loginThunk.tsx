import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthenticationToken from "../../util/setAuthenticationToken";
import { IAuth, ILoginUser, IUserLimit } from "./loginInterface";
import { toast } from "react-toastify";
import { sleep } from "helpers/sleep";

const host = process.env.REACT_APP_HOST;

const useToken = (token: string) => {
  if (token) {
    localStorage.removeItem("jwtToken");
    localStorage.setItem("jwtToken", token);
  } else {
    console.log("Brak tokena :>> ");
    localStorage.removeItem("jwtToken");
  }
};

export const login = createAsyncThunk("LOGIN", async (text: ILoginUser) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  };
  const body = JSON.stringify(text);
  try {
    const res = await axios.post(`${host}/api/users/login`, body, config);
    if (res.status === 200) {
      useToken(res.data.token);
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
});

export const register = createAsyncThunk("REGISTER", async (text: IAuth) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  };
  const body = JSON.stringify(text);
  try {
    const res = await axios.post(`${host}/api/users/register`, body, config);
    if (res.status === 200) {
      useToken(res.data.token);
      return res.data;
    }
    return;
  } catch (error) {
    return {
      message: error.response.data,
      error: true,
    };
  }
});

export const loginUserLoaded = createAsyncThunk("LOGIN", async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  };
  const token = localStorage.getItem("jwtToken");
  let userId = null;
  if (token) {
    userId = setAuthenticationToken();
  } else {
    userId = null;
    return;
  }
  try {
    const res = await axios.get(`${host}/api/auth/${userId}`, config);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    return {
      message: error.response.data,
      error: true,
    };
  }
});

export const loginRemindPassword = createAsyncThunk(
  "REMIND_PASSWORD",
  async ({ value, navigate }: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ email: value.email });
    try {
      const res = await axios.post(
        `${host}/api/users/remind-password`,
        body,
        config
      );
      if (res.status === 200) {
        localStorage.setItem("emailChange", value.email);
        navigate("/remind-password");
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

export const loginRemindCode = createAsyncThunk(
  "REMIND_CODE",
  async ({ code, navigate }: any) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ code });
    try {
      const res = await axios.post(
        `${host}/api/users/remind-code`,
        body,
        config
      );
      console.log(`res.status`, res);
      if (res.status === 200) {
        localStorage.setItem("emailCode", code);
        navigate("/change-password");
        return res.data;
      }
      return;
    } catch (error) {
      toast.error("Nie prawid??owy kod");
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);

export const loginChangePassword = createAsyncThunk(
  "CHANGE_PASSWORD",
  async ({ email, code, password, navigate }: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ email, code, password });
    try {
      const res = await axios.post(
        `${host}/api/users/change-password`,
        body,
        config
      );
      if (res.status === 200) {
        res.data.password && navigate("/login");
        toast.success("Has??o zosta??o zmienione!");
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

export const loginCheckPassword = createAsyncThunk(
  "CHANGE_PASSWORD_ACCOUNT",
  async ({ email, password }: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(
        `${host}/api/users/check-password`,
        body,
        config
      );
      if (res.status === 200) {
        return res.data;
      }
      return;
    } catch (error) {
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);

export const loginSetNewPassword = createAsyncThunk(
  "SET_NEW_PASSWORD",
  async ({ email, newPassword, oldPassword }: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ email, newPassword, oldPassword });
    try {
      const res = await axios.post(
        `${host}/api/users/set-new-password`,
        body,
        config
      );
      if (res.status === 200) {
        toast.success(res.data.message)
        return res.data;
      }
      return;
    } catch (error) {
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);

export const loginChangeMyAccountPassword = createAsyncThunk(
  "CHANGE_PASSWORD_ACCOUNT",
  async ({ email, password }: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(
        `${host}/api/users/change-password`,
        body,
        config
      );
      if (res.status === 200) {
        toast.success("Has??o zosta??o zmienione!");
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

export const loginChangeUserLanguage = createAsyncThunk(
  "CHANGE_USER_LANGUAGE",
  async (language: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    console.log('language :>> ', language);
    const body = JSON.stringify({ language });
    try {
      const res = await axios.post(
        `${host}/api/users/change-language`,
        body,
        config
      );
      if (res.status === 200) {
        toast.success("J??zyk zosta?? zmieniony!");
        return res.data;
      }
      return;
    } catch (error) {
      toast.error("Co?? posz??o nie tak");
      console.log(`error`, error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);

export const loginChangeLanguage = createAsyncThunk(
  "CHANGE_USER_LIMIT",
  async ({ limitDay, limitMouth, limitFull }: IUserLimit) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    const body = JSON.stringify({ limitDay, limitMouth, limitFull });
    try {
      const res = await axios.post(
        `${host}/api/users/change-limit`,
        body,
        config
      );
      if (res.status === 200) {
        toast.success("Limity zosta??y zmienione!");
        return res.data;
      }
      return;
    } catch (error) {
      toast.error("Co?? posz??o nie tak");
      console.log(`error`, error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);

export const loginSwitchAccount = createAsyncThunk(
  "SWITCH_ACCOUNT",
  async ({ accountId }: any) => {

    const useToken = (token: string) => {
      if (token) {
        localStorage.removeItem("jwtToken");
        localStorage.setItem("jwtToken", token);
      } else {
        console.log("Brak tokena :>> ");
        localStorage.removeItem("jwtToken");
      }
    };
    const body = JSON.stringify({ accountId });
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    };
    try {
      const res = await axios.post(
        `${host}/api/users/switch-account`, body, config);
      if (res.status === 200) {
        await sleep(6000)
        await toast.success("Zosta??e?? przelogowany");
        useToken(res.data.token)
        return await res.data;
      }
      return;
    } catch (error) {
      toast.error("Co?? posz??o nie tak");
      console.log(`error`, error);
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
);