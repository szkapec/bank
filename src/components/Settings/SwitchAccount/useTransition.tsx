import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useRef, useState, useTransition } from "react";
import axios from "axios";

//https://javascript.plainenglish.io/react-v18-0-usetransition-master-in-2-minutes-3493281690ab

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
      `http://localhost:5000/api/users/connect-account`,
      config
    );
    return res.data;
}


const initialValues = {
  login: "",
  password: "",
};

const useTransitionTest = () => {
  const [isPending, startTransition] = useTransition(); //useTransition Hook Declaration
  const [images, setImages] = useState(null); //useState hook

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
