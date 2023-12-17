import axios from "axios";

const DEPARTAMENTOS_URL = "http://localhost:4000";

class DepartamentoService {
  async getDepartamentos() {
    return await axios.get(`${DEPARTAMENTOS_URL}/read`, {}).then((response) => {
      return response.data;
    });
  }
}

export default new DepartamentoService();
