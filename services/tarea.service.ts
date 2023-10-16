import axios from "axios";
import authHeader from "./auth.header";
import { CreateTarea, UpdateTarea } from "@/types";

const API_URL = "http://localhost:3000/api/tareas";

class TareaService {
  async createTarea(createTarea: CreateTarea) {
    const { descripcion, idAsignatura, fechaTermino } = createTarea;
    const res = await axios.post(
      API_URL,
      {
        descripcion,
        idAsignatura,
        fechaTermino,
      },
      {
        headers: authHeader(),
      }
    );
    return res.data;
  }

  async updateTarea(id: number, updateTarea: UpdateTarea) {
    const { descripcion, estado, fechaTermino } = updateTarea;
    const res = await axios.patch(
      `${API_URL}/${id}`,
      {
        descripcion,
        fechaTermino,
        estado,
      },
      {
        headers: authHeader(),
      }
    );
    return res.data;
  }

  async getTareaById(idtarea: number) {
    return await axios
      .get(`${API_URL}/${idtarea}`, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  async eliminarTarea(id: number) {
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: authHeader()
    });
    return res.data;
  }

}

export default new TareaService();
