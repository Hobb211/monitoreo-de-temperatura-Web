import axios from "axios";
import { userLogin, userRegister } from "@/types";
import { createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = "http://localhost:3000/api/auth/";

class AuthService {
  
  async login(userlogin: userLogin){
    const { email, password } = userlogin;
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("isLogin", "true");
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(userRegister: userRegister) {
    const { fullName, email, password } = userRegister;
    return axios
      .post(API_URL + "register", {
        fullName,
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("isLogin", "true");
        }
        return response.data;
      });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }
}

export default new AuthService();
