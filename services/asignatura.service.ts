import axios from "axios";
import authHeader from "./auth.header";
import { getUserFromLocalStorage } from "@/redux/services/persistUser.service";
import { CreateAsignatura } from "@/types";

const API_URL = "http://localhost:3000/api/asignatura";

class AsignaturaService {
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

    async createAsignatura(createAsignatura: CreateAsignatura) {
        const { titulo, instructor, sala, nrc } = createAsignatura;
        const userEmail = getUserFromLocalStorage()?.email;
        const res = await axios.post(API_URL, {
            titulo,
            instructor,
            sala,
            nrc,
            userEmail
        }, {
            headers: authHeader()
        });
        return res.data
    }

    async eliminarAsignatura() {
        return "Se ha eliminado la asignatura"
    }



}

export default new AsignaturaService();
