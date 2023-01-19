import { ErrorFunction } from "components/Error/Error";
import setAuthenticationToken from "../util/setAuthenticationToken";

export const globalConfig = (token: any) => {
  let userId = null;
  if (token) {
    userId = setAuthenticationToken();
  } else {
    userId = null;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: `Bearer ${token}`,
    },
  };
  if(!userId) {
    ErrorFunction(userId, 'error.token')
  };

  return {
    config,
    userId
  };
}