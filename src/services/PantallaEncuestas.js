import axios from "axios";

const pedirFechasFiltroPeriodo = async (fechaInicio, fechaFin) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/ivr/encuestas/${fechaInicio}/${fechaFin}`)
        
        const respuestaFinal = []
        for(let i=0; i < response.data.length; i ++){
            respuestaFinal.push(response.data[i])
        }
        
        return respuestaFinal;

      } catch (error) {
        return "ERROR";
      }
}

const PantallaEncuestas = {
    pedirFechasFiltroPeriodo,
}

export default PantallaEncuestas