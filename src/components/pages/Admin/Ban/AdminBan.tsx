import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectorAuthLoginId } from "store/Login/loginSelector";
import "./AdminBan.scss";
import { toast } from "react-toastify";

const initialValue = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  bankAccountNumber: "",
};

const AdminBan = () => {
  const [idUserBan, setIdUserBan] = useState<string>("");
  const [dataBanned, setDataBanned] = useState(initialValue);

  const idAdminSelector = useSelector(selectorAuthLoginId);
  const streamEventLogout = (ban: boolean) => {
    const adminBan = async () => {
      const { data } = await axios.post("http://localhost:5000/api/event/ban", {
        id: idUserBan,
        adminId: idAdminSelector,
        ban,
      });
      setDataBanned(data);
      console.log("data :>> ", data);
      if(data?.ban) {
        toast.success(data?.text);
      }
      return { data, error: false };
    };
    adminBan();
  };
  console.log("dataBanned :>> ", dataBanned);
  return (
    <section className="admin-logout">

      <h2>Zbanuj użytkownika</h2>
      <label>Wprowadz ID użytkownika</label>

      <TextField
        onChange={(e) => setIdUserBan(e.target.value)}
        sx={{ paddingRight: "5px" }}
        label="Identyfikator"
        variant="outlined"
        size="small"
        focused
      />
      <Button
        variant="outlined"
        size="small"
        onClick={() => streamEventLogout(false)}
      >
        Sprawdz
      </Button>

      {dataBanned._id && (
        <Box className="banned">
          <h3>Chcesz zbanować:</h3>
          <Box>
            <div>
              <span>Id:</span> {dataBanned?._id}
            </div>
            <div>
              <span>firstName:</span> {dataBanned?.firstName}
            </div>
            <div>
              <span>lastName:</span> {dataBanned?.lastName}
            </div>
            <div>
              <span>email:</span> {dataBanned?.email}
            </div>
            <div>
              <span>Number banku:</span> {dataBanned?.bankAccountNumber}
            </div>
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => streamEventLogout(true)}
          >
            Zbanuj
          </Button>
        </Box>
      )}
    </section>
  );
};

export default AdminBan;
