import axios from "axios";

export const getRecipients = async () => {
  const token = localStorage.getItem("jwtToken");
  const config = {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(
    `${process.env.REACT_APP_HOST}/api/recipient/63503f3f4093e59d0eaf3c9c`,
    config
  );
  return res.data;
};
