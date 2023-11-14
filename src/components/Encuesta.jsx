import Datepicker from "./Datepicker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListaLlamada from "./ListaLlamadas";
import ModalCSV from "./Modal.jsx";
import { useState, useEffect } from "react";
import TablaEncuesta from "./TablaEncuesta";
import Swal from "sweetalert2";

import PantallaEncuesta from "../services/PantallaEncuestas.js";

//Visualizacion de la pantalla, con todos los componentes del frontend
const Encuestas = () => {
  const [lista, setLista] = useState(null);
  const [encuesta, setEncuesta] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tomarLlamada, setTomarLlamada] = useState(null);

  //Funcion que maneja la muestra del CSV en pantalla
  const handleMostrarModal = () => {
    setShowModal(true);
  };

  //Funcion final del CU que cierra el CSV
  const finCU = () => {
    setShowModal(false);
  };

  useEffect(() => {}, []);

  //Funcion que manda las fechas y recibe las llamadas filtradas que tienen encuesta y las setea en la lista de llamadas
  const handleBuscar = async () => {
    if (fechaInicio && fechaFin) {
      if (fechaInicio < fechaFin && fechaFin <= new Date()) {
        setEncuesta(null);
        const fechaInicioFormateada = obtenerFechaFormateada(fechaInicio);
        const fechaFinFormateada = obtenerFechaFormateada(fechaFin);
        const llamadas = await PantallaEncuesta.pedirFechasFiltroPeriodo(
          fechaInicioFormateada,
          fechaFinFormateada
        );
        if (Array.isArray(llamadas) && llamadas.length === 0) {
          setLista(null);
          Swal.fire({
            text: "No se encontraron resultados",
            icon: "warning",
            confirmButtonText: "Aceptar",
          });
        } else {
          if (llamadas === "ERROR") {
            setLista(null);
            Swal.fire({
              text: "Ha habido un error con el servidor, recargue la página he intente nuevamente",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          } else {
            setLista(dividirArreglo(llamadas));
          }
        }
      } else {
        Swal.fire({
          text: "El periodo seleccionado no es válido",
          icon: "warning",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  //Formato de fecha para hacer la peticion http
  const obtenerFechaFormateada = (fecha) => {
    const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };
    const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
    return fechaFormateada.replace(/\//g, "-");
  };

  //Funcion enviada al DatePicker para que setee el parametro fecha de inicio a enviar
  const tomarFechaInicioPeriodo = (date) => {
    setFechaInicio(date);
  };

  //Funcion enviada al DatePicker para que setee el parametro fecha de fin a enviar
  const tomarFechaFinPeriodo = (date) => {
    setFechaFin(date);
  };

  //Esta función se utiliza para crear una lista de listas para facilitar la paginación en la lista de llamadas
  const dividirArreglo = (array) => {
    const resultado = [];
    const groupSize = 3; //Cantidad de llamadas por página
    let actualIndx = 0;

    if (array.length < groupSize) {
      return [array];
    }

    while (actualIndx < array.length) {
      resultado.push(array.slice(actualIndx, actualIndx + groupSize));
      actualIndx += groupSize;
    }

    return resultado;
  };

  //Funcion que muestra la notificación de la cola de impresión
  const handleImprimir = () => {
    if (encuesta) {
      Swal.fire({
        text: "Archivo enviado a cola de impresión",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } else {
      Swal.fire({
        text: "Debe haber una encuesta consultada para poder imprimir",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="container">
      {showModal && (
        <ModalCSV llamada={tomarLlamada} encuesta={encuesta} cerrar={finCU} />
      )}
      <Row className="justify-content-center align-items-center min-vh-10 g-2">
        <Col xs={3}>
          <div
            style={{ backgroundColor: "lightblue" }}
            className="d-flex flex-column justify-content-between"
          >
            <div style={{ margin: "10px" }}>
              <Datepicker
                mensaje={"Seleccionar Fecha Inicio:"}
                cambioFecha={tomarFechaInicioPeriodo}
              />
            </div>
            <div style={{ margin: "10px" }}>
              <Datepicker
                mensaje={"Seleccionar Fecha Fin:"}
                cambioFecha={tomarFechaFinPeriodo}
              />
            </div>
            <div className="d-flex justify-content-center my-2">
              <Button
                onClick={() => handleBuscar()}
                variant="primary"
                className="me-2"
              >
                Buscar
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={8}>
          <div
            className="d-flex justify-content-center my-10"
            style={{ backgroundColor: "lightblue" }}
          >
            <ListaLlamada
              lista={lista}
              tomarEncuesta={setEncuesta}
              tomarLlamada={setTomarLlamada}
            />
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col xs={11}>
          <div
            className="d-flex flex-column align-items-center my-2"
            style={{ backgroundColor: "lightblue" }}
          >
            <Row>
              <h5>Encuesta:</h5>
            </Row>
            <Row>
              <TablaEncuesta encuesta={encuesta} />
              <div className="d-flex justify-content-center my-2">
                <Button
                  onClick={() => handleMostrarModal()}
                  variant="light"
                  className="me-2"
                >
                  Generar CSV
                </Button>
                <Button
                  onClick={() => handleImprimir()}
                  variant="light"
                  className="me-2"
                >
                  Imprimir
                </Button>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Encuestas;
