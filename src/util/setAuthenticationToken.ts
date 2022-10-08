import axios from "axios";
import jwtDecode from "jwt-decode";

const setAuthenticationToken = () => {
  if (localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
    const now = new Date().getTime() / 1000;

    if (now > decodedToken.exp) {
      console.log(`WYGASL!!!`);
      return false;
    } else {
      console.log(`JESZCZE PRAWIDLOWY!!!`);
      return decodedToken.id;
    }

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtToken");
    } else {
      // initialState.user = decodedToken
    }
  }

  console.log(`axios.defaults.headers.common`, axios.defaults.headers.common);
  // console.log(`token`, token)
  //   if(token) {
  //       axios.defaults.headers.common['authentication-token'] = token;
  //   }
  // else delete axios.defaults.headers.common['authentication-token']
};

export default setAuthenticationToken;
