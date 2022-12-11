import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import "./AdminLogout.scss";
import { useSelector } from "react-redux";
import { selectorAuthLoginId } from "store/Login/loginSelector";
import { toast } from "react-toastify";

const AdminLogout = () => {

  const [idLogout, setIdLogout] = useState('');
  const idAdminSelector = useSelector(selectorAuthLoginId)
  const streamEventLogout = () => {

    const logoutUser = async () => {
      const { data } = await axios.post("http://localhost:5000/api/event/logout", { id: idLogout, adminId: idAdminSelector });

      if(data?.logout) {
        toast.success(data?.text);
      }
      return { data, error: false };
    };
    logoutUser();
  };



  return (
    <section className="admin-logout">
      <h2>Wyloguj użytkownika</h2>
      <label>Wprowadz ID użytkownika</label>
      <TextField onChange={(e) => setIdLogout(e.target.value)} sx={{paddingRight: '5px'}} label="Identyfikator" variant="outlined" size="small" focused />
      <Button variant="outlined" size="small" onClick={() => streamEventLogout()}>Wyloguj</Button>
    </section>
  );
};

export default AdminLogout;
