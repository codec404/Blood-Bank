import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });

      //store token
      if (data.success) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        window.location.replace('/')
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//User Register
export const userRegister = createAsyncThunk(
  "auth/register",
  async ({
    email,
    password,
    name,
    organizationName,
    role,
    hospitalName,
    address,
    website,
    phone,
  },{rejectWithValue}) => {
    try {
        const {data} = await API.post('/auth/register',{email,
            password,
            name,
            organizationName,
            role,
            hospitalName,
            address,
            website,
            phone})
            if(data.success){
                // toast.success(data.message)
                alert("User Regsitered Successfully")
                window.location.replace('/login')
            }
    } catch (error) {
        // console.log(error);
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
          } else {
            return rejectWithValue(error.message);
          }
    }
  }
);


// Current User

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async ({rejectWithValue}) => {
        try {
            const res = await API.get('/auth/current-user')
            
            // res && res.data
            if(res?.data){
                return res.data
            }

        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
              } else {
                return rejectWithValue(error.message);
              }
        }
    }
)
