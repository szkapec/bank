import { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import "./AdminLogout.scss";
import { useSelector } from "react-redux";
import { selectorAuthLoginId } from "store/Login/loginSelector";
import { toast } from "react-toastify";
import { API } from "api/dev-api";
import TextWrapper from "components/Contents/TextWrapper";

const AdminLogout = () => {
  const [idLogout, setIdLogout] = useState("");
  const idAdminSelector = useSelector(selectorAuthLoginId);
  const streamEventLogout = () => {
    const logoutUser = async () => {
      const { data } = await axios.post(
        API.USER_EVENT_LOGOUT,
        { id: idLogout, adminId: idAdminSelector }
      );
      if (data?.logout) {
        toast.success(data?.text);
      }
      return { data, error: false };
    };
    logoutUser();
  };

  return (
    <section className="admin-logout">
      <TextWrapper label="admin.logOutUser" Selector="h2" />
      <TextWrapper label="admin.userId" Selector="label" />
      <TextField
        onChange={(e) => setIdLogout(e.target.value)}
        sx={{ paddingRight: "5px" }}
        label="Identyfikator"
        variant="outlined"
        size="small"
        focused
      />
      <Button
        variant="outlined"
        size="small"
        onClick={() => streamEventLogout()}
      >
        <TextWrapper label="admin.logOut" Selector="label" />
      </Button>
    </section>
  );
};

export default AdminLogout;
