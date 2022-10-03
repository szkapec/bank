import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const host = process.env.REACT_APP_HOST

interface IText {
  email: string,
  password: string
}

export const login = createAsyncThunk('LOGIN', 
  async (text: IText) => {
    const config = { headers: { 
      'Content-Type': 'application/json',
      'mode': 'cors',
    }}
    const body = JSON.stringify(text);
    
    try {
      const res = await axios.post(`${host}/api/users/login`, body, config);
      console.log(`res`, res)
      console.log(`res`, res.data)
      if(res.status === 200) {
        console.log('res.data.user :>> ', res.data.user);
        localStorage.setItem("jwtToken", res.data.user.token)
        return res.data.user;
      }
      return;

    } catch (error) {
      console.log(`error`, error)
      return {
        message: error.response.data,
        error: true,
      };
    }
  }
)
