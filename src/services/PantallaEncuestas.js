import axios from "axios";

//Funcion que se comunica con el gestor para enviarle las fechas de filtro y recive la lista de las llamadas con encuesta filtradas
//Envia dos fechas
const pedirFechasFiltroPeriodo = async (fechaInicio, fechaFin) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/ivr/encuestas/${fechaInicio}/${fechaFin}`
    );

    const respuestaFinal = [];
    for (let i = 0; i < response.data.length; i++) {
      respuestaFinal.push(response.data[i]);
    }

    return respuestaFinal;
  } catch (error) {
    return "ERROR";
  }
};

//Funcion que se comunica con el gestor y le envia el id de la llamada elegida para buscar su encuesta, recibe la encuesta
const pedirSeleccionLlamada = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/ivr/encuestas/${id}`
    );

    return response.data;
  } catch (error) {
    return "ERROR";
  }
};

//Objeto pantalla que tiene los métodos de comunicación con el GestorEncuesta
const PantallaEncuestas = {
  pedirFechasFiltroPeriodo,
  pedirSeleccionLlamada,
};

export default PantallaEncuestas;
