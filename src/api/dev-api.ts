const LOCAL = "http://localhost:5000/api/";
const HOST = process.env.REACT_APP_HOST;

export const API = {
  USER_EVENT_BAN: HOST + "/api/event/ban",
  USER_EVENT_LOGOUT: HOST + "/api/event/logout",
  USER_EVENT_STREAM: HOST + "/stream",
  POST_ADMIN_USER: HOST + "/api/admin/users",
  POST_USER_LOGIN: HOST + "/api/users/login",
  POST_USER_REGISTER: HOST + "/api/users/register",
  GET_USER_AUTH: HOST + "/api/auth/",
  POST_USER_REMIND_PASSWORD: HOST + "/api/users/remind-password",
  POST_USER_REMIND_CODE: HOST + "/api/users/remind-code",
  POST_USER_CHANGE_PASSWORD: HOST + "/api/users/change-password",
  POST_USER_CHECK_PASSWORD: HOST + "/api/users/check-password",
  POST_USER_SET_NEW_PASSWORD: HOST + "/api/users/set-new-password",
  POST_USER_CHANGE_LANGUAGE: HOST + "/api/users/change-language",
  POST_USER_CHANGE_LIMIT: HOST + "/api/users/change-limit",
  POST_USER_SWITCH_ACCOUNT: HOST + "/api/users/switch-account",

  GET_RECIPIENTS: HOST + "/api/recipient/",
  PUT_RECIPIENTS: HOST + "/api/recipient",
  PATCH_RECIPIENTS: HOST + "/api/recipient/edit",
  DELETE_RECIPIENTS: HOST + "/api/recipient/"
};
