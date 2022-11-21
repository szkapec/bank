import React, { useState } from "react";
import { useAppDispatch } from "store/hooks";
import { GetUsersAdmin } from "store/Admin/adminThunk";
import { IAdminGetUser } from "store/Admin/adminInterface";
import Users from "./Users";
import { Box, Button } from "@mui/material";
import styled from "styled-components";

const initialValue = {
  name: "",
  lastName: "",
  email: "",
  id: "",
};

const AdminUsers = () => {
  const [formData, setFormData] = useState<IAdminGetUser>(initialValue);
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getUsers = () => {
    dispatch(GetUsersAdmin(formData));
  };

  return (
    <Box sx={{ padding: "30px" }} className="admin-users">
      <Box>Wyszukaj użytkowników po ID lub Nazwisko i Email</Box>
      <StyledAdmin className="admin-search">
        <Box>
          <div>
            <label htmlFor="id">id</label>
            <input
              type="text"
              name="id"
              placeholder="Identyfikator"
              onChange={handleChange}
            />
          </div>
          <label htmlFor="lastName">Nazwisko</label>
          <input
            type="text"
            name="lastName"
            placeholder="Nazwisko"
            onChange={handleChange}
          />

          <div>
            <label htmlFor="email">email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
        </Box>
      </StyledAdmin>
      <Button
        sx={{ margin: "20px 0 30px 0" }}
        variant="contained"
        onClick={() => getUsers()}
      >
        Pobierz liste użytkowników
      </Button>

      <Users></Users>
    </Box>
  );
};

const StyledAdmin = styled.div`
  label {
    display: block;
    margin-bottom: 5px;
    margin-top: 10px;
  }

  input {
    border: 1px solid gray;
    padding: 8px 12px;
    width: 400px;
    border-radius: 5px;
  }

  button {
    color: white;
    background-color: red;
    border: 1px solid red;
    border-radius: 20px;
    padding: 7px 22px;
    margin-top: 20px;
    min-width: 100px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    font-size: 16px;
  }
`;

export default React.memo(AdminUsers);
