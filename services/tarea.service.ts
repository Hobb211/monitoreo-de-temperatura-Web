import axios from "axios";
import authHeader from "./auth.header";
import { getUserFromLocalStorage } from "@/redux/services/persistUser.service";
import { CreateAsignatura } from "@/types";

const API_URL = "http://localhost:3000/api/asignatura";

class TareaService {
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

  async createTarea(createAsignatura: CreateAsignatura) {
    const { titulo, instructor, sala, nrc } = createAsignatura;
    const userEmail = getUserFromLocalStorage()?.email;
    const res = await axios.post(
      API_URL,
      {
        titulo,
        instructor,
        sala,
        nrc,
        userEmail,
      },
      {
        headers: authHeader(),
      }
    );
    return res.data;
  }

  async eliminarAsignatura(idAsignatura: number) {
    const id = idAsignatura;
    const res = await axios.delete(API_URL, {
      headers: authHeader(),
      data: { id },
    });
    return res.data;
  }
}

export default new TareaService();
