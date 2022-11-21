import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import "./AdminLogout.scss";

const AdminLogout = () => {

  const [idLogout, setIdLogout] = useState('');
  const streamEventLogout = () => {

    const getFetchPosts = async () => {
      const { data: { data = [] }} = await axios.post("http://localhost:5000/api/event", { id: idLogout });
      return { data, error: false };
    };
    getFetchPosts();
  };



  return (
    <section className="admin-logout">
      <h2>Wyloguj użytkownika</h2>
      <label>Wprowadz ID użytkownika</label>
      <div>6350404d4093e59d0eaf3ce2</div>
      <TextField onChange={(e) => setIdLogout(e.target.value)} sx={{paddingRight: '5px'}} label="Identyfikator" variant="outlined" size="small" focused />
      <Button variant="outlined" size="small" onClick={() => streamEventLogout()}>Wyloguj</Button>
    </section>
  );
};

export default AdminLogout;
