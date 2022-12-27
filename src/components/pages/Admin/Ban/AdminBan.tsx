import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectorAuthLoginId } from "store/Login/loginSelector";
import "./AdminBan.scss";
import { toast } from "react-toastify";
import { API } from "api/dev-api";
import TextWrapper from "components/Contents/TextWrapper";

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
      const { data } = await axios.post(API.USER_EVENT_BAN, {
        id: idUserBan,
        adminId: idAdminSelector,
        ban,
      });
      setDataBanned(data);
      console.log("data :>> ", data);
      if (data?.ban) {
        toast.success(data?.text);
      }
      return { data, error: false };
    };
    adminBan();
  };

  return (
    <section className="admin-logout">
      <TextWrapper label="admin.userBan" Selector="h2" />
      <TextWrapper label="admin.userId" Selector="label" />
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
        <TextWrapper label="admin.check" />
      </Button>

      {dataBanned._id && (
        <Box className="banned">
          <TextWrapper label="admin.wantToBan" Selected="h3" />
          <Box>
            <Box>
              <TextWrapper label="id" />
              <span>{dataBanned?._id}</span>
            </Box>
            <Box>
              <TextWrapper label="admin.firstName" />
              <span>{dataBanned?.firstName}</span>
            </Box>
            <Box>
              <TextWrapper label="admin.lastName" />
              <span>{dataBanned?.lastName} </span>
            </Box>
            <Box>
              <TextWrapper label="admin.email" />
              <span>{dataBanned?.email}</span>
            </Box>
            <Box>
              <TextWrapper label="admin.bankNumber" />
              <span>{dataBanned?.bankAccountNumber}</span>
            </Box>
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() => streamEventLogout(true)}
          >
            <TextWrapper label="admin.ban" />
          </Button>
        </Box>
      )}
    </section>
  );
};

export default AdminBan;
