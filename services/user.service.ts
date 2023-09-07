import axios from "axios";
import authHeader from "./auth.header";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getUserFromLocalStorage } from "@/redux/services/persistUser.service";

const API_URL = "http://localhost:3000/api/usuario";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  async getUserAsignaturas() {
    const userEmail = getUserFromLocalStorage()?.email;
    return await axios
      .get(`${API_URL}/${userEmail}`, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new UserService();
