import axios from "axios";
import authHeader from "./auth.header";
import { getUserFromLocalStorage } from "@/redux/services/persistUser.service";
import { EliminarAsignatura } from "@/types";

const API_URL = "http://localhost:3000/api/usuario";

class UserService {
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
