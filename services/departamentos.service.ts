import axios from "axios";

const DEPARTAMENTOS_URL = "http://localhost:4000";

class DepartamentoService {
  async getDepartamentos() {
    return await axios.get(`${DEPARTAMENTOS_URL}/read`, {}).then((response) => {
      return response.data;
    });
  }

  async getInfoDepto(departamento: number) {
    return await axios
      .get(`${DEPARTAMENTOS_URL}/read-departament/${departamento}`, {})
      .then((response) => {
        return response.data;
      });
  }

  // async getTemperaturasDptos() {
  //   return await axios
  //     .get(`${DEPARTAMENTOS_URL}/get-departaments`, {})
  //     .then((response) => {
  //       return response.data;
  //     });
  // }
}

export default new DepartamentoService();
