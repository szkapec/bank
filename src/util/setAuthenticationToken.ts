import axios from "axios";
import jwtDecode from "jwt-decode";

interface IDecodedToken {
  id: string;
  name: string;
  email: string;
  exp: number;
}

const setAuthenticationToken = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    let decodedToken: IDecodedToken = jwtDecode(token);
    const now = new Date().getTime() / 1000;

    if (now > decodedToken.exp) {
      console.log(`WYGASL!!!`);
      return false;
    } else {
      console.log(`JESZCZE PRAWIDLOWY!!!`);
      return decodedToken?.id;
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