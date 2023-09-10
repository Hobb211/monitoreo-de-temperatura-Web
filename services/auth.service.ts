import axios from "axios";
import { Auth, userRegister } from "@/types";

const API_URL = "http://localhost:3000/api/auth/";

class AuthService {
  async login(userlogin: Auth) {
    const { email, password } = userlogin;
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        return response.data;
      });
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
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
