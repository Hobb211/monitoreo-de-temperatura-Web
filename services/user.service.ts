import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:3000/api/user/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getUserAsignaturas() {
    return axios.post(API_URL + "asignaturas", { headers: authHeader() });
  }
}

export default new UserService();
