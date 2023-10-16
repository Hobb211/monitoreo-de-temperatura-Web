import axios from "axios";
import authHeader from "./auth.header";
import { getUserFromLocalStorage } from "@/redux/services/persistUser.service";

const API_URL = "http://localhost:3000/api/usuarios";

class UserService {
  async getUserAsignaturas() {
    const userEmail = getUserFromLocalStorage()?.email;
    return await axios
      .get(`${API_URL}/${userEmail}/asignaturas`, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

}

export default new UserService();
