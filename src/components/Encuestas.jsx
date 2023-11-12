import Datepicker from "./Datepicker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListaLlamada from "./ListaLlamadas";
import { useState, useEffect } from "react";
import TablaEncuesta from "./TablaEncuesta";

const listaMock = [
  {
    id: 1,
    cliente: "Juan Carlos",
    tieneEncuesta: true,
    estado: "finalizada",
    duracion: 0.5,
  },
  {
    id: 2,
    cliente: "Pepe Argento",
    tieneEncuesta: true,
    estado: "finalizada",
    duracion: 1,
  },
  {
    id: 3,
    cliente: "Sheldon Cooper",
    tieneEncuesta: true,
    estado: "finalizada",
    duracion: 10,
  },
  {
    id: 4,
    cliente: "Pedro Picapiedra",
    tieneEncuesta: false,
    estado: "en curso",
    duracion: 12,
  },
];

const encuestaMock = {
  descripcion: "Encuesta 1",
  pregunta1:
    "¿Cuál es tu canal de comunicacion preferido para contactar nuestro servicio?",
  respuesta1: "Chat en vivo",
  pregunta2:
    "¿Qué tan claro/a encuentras el lenguaje utilizado por nuestro equipo de soporte?",
  respuesta2: "Poco claro/a",
  pregunta3:
    "¿Qué tan competente te parece nuestro equipo de atención al cliente?",
  respuesta3: "Competente",
};

const Encuestas = () => {
  const [lista, setLista] = useState(null);
  const [encuesta, setEncuesta] = useState(null);

  useEffect(() => {
    setLista(dividirArreglo(listaMock));
    setEncuesta(encuestaMock);
  }, []);

  //Esta función se utiliza para crear una lista de listas para facilitar la paginación
  const dividirArreglo = (array) => {
    const resultado = [];
    const groupSize = 3;
    let actualIndx = 0;

    if (array.length < groupSize) {
      return [array];
    }

    while (actualIndx < array.length) {
      resultado.push(array.slice(actualIndx, actualIndx + groupSize));
      actualIndx += groupSize;
    }

    console.log(resultado);
    return resultado;
  };

  return (
    <div className="container">
      <Row className="justify-content-center align-items-center min-vh-10 g-2">
        <Col xs={3}>
          <div style={{ backgroundColor: "lightblue" }} className="d-flex flex-column justify-content-between">
            <div style={{ margin: "10px" }}>
              <Datepicker mensaje={"Seleccionar Fecha Inicio:"} />
            </div>
            <div style={{ margin: "10px" }}>
              <Datepicker mensaje={"Seleccionar Fecha Fin:"} />
            </div>
            <div
              className="d-flex justify-content-center my-2"
            >
              <Button variant="primary" className="me-2">
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
            <ListaLlamada lista={lista} />
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
                <Button variant="light" className="me-2">
                  Generar CSV
                </Button>
                <Button variant="light" className="me-2">
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
