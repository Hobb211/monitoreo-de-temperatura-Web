import axios from "axios";
import authHeader from "./auth.header";
import { CreateTarea } from "@/types";

const API_URL = "http://localhost:3000/api/tarea";

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

  async eliminarAsignatura(idTarea: number) {
    const id = idTarea;
    const res = await axios.delete(API_URL, {
      headers: authHeader(),
      data: { id },
    });
    return res.data;
  }
}

export default new TareaService();
