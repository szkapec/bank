import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useRef, useState, useTransition } from "react";
import axios from "axios";

const api = async() => {
  const token = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_HOST}/api/users/connect-account`,
      config
    );
    return res.data;
}


const initialValues = {
  login: "",
  password: "",
};

const useTransitionTest = () => {
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState(null);

  startTransition(() => {
    loadData();
  });
  

  const loadData = async () => {
    const info = await api();
    console.log(`info`, info)
   
  };

  return (
    <div>
      <>
        <button
          onClick={() => {
            startTransition(() => {
              loadData();
            });
          }}
        >
          NEXT
        </button>
      </>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
        <Select defaultValue="" id="grouped-select" label="Grouping">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Category 1</ListSubheader>
          <MenuItem value={1}>Option 1</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <ListSubheader>Category 2</ListSubheader>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default useTransitionTest;
