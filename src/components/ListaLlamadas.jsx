import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import PantallaEncuestas from "../services/PantallaEncuestas";
import Swal from "sweetalert2";

//Lista seleccionable de las llamadas, recibe la lista de llamadas, funcion para tomar encuesta y para tomar la llamada elegida
function ListaLlamada({ lista, tomarEncuesta, tomarLlamada }) {
  const [itemPaginado, setItemPaginado] = useState(0);
  const [limitePag, setLimitePag] = useState([1, 3]);

  useEffect(() => {}, []);

  //Crea un vector con los numeros de página para mostrar en la paginación de llamadas
  let paginas = [];
  if (lista !== null) {
    for (let i = 0; i < lista.length; i++) {
      paginas.push(i + 1);
    }
  }

  //Maneja la selección de una página seleccionada
  const handlePaginacion = (numPag) => {
    setItemPaginado(numPag - 1);
    setLimitePag([numPag - 1, numPag + 1]);
  };

  //Maneja la paginación al clickear en la flecha de "siguiente"
  const handleNext = () => {
    setItemPaginado((prevItemPaginado) => {
      if (prevItemPaginado < lista.length - 1) {
        setLimitePag([prevItemPaginado + 1, prevItemPaginado + 3]);
        return prevItemPaginado + 1;
      }
      return prevItemPaginado;
    });
  };

  //Maneja la paginación al clickear en la flecha de "anterior"
  const handlePrev = () => {
    setItemPaginado((prevItemPaginado) => {
      if (prevItemPaginado > 0) {
        setLimitePag([prevItemPaginado - 1, prevItemPaginado + 1]);
        return prevItemPaginado - 1;
      }
      return prevItemPaginado;
    });
  };

  //Funcion que se comunica con el gestor y obtiene la encuesta de la llamada elegida y la setea en la tabla, recibe una llamada
  const tomarSeleccionLlamada = async (llamada) => {
    const encuesta = await PantallaEncuestas.pedirSeleccionLlamada(llamada.id);
    if (encuesta === "ERROR") {
      tomarEncuesta(null);
      Swal.fire({
        text: "Ha habido un error con el servidor, recargue la página he intente nuevamente",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      tomarEncuesta(encuesta);
    }
    tomarLlamada(llamada);
  };

  return (
    <div className="d-flex justify-content-center my-2 flex-column">
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Seleccion</th>
              <th>Llamada</th>
              <th>Cliente</th>
              <th>Operador</th>
              <th>Estado Actual</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            {lista === null
              ? Array.from({ length: 3 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    <td></td>
                    {Array.from({ length: 5 }).map((_, colIndex) => (
                      <td key={colIndex}>Sin búsqueda</td>
                    ))}
                  </tr>
                ))
              : lista[itemPaginado].map(
                  (llamada) =>
                    llamada.id && (
                      <tr key={llamada.id} active>
                        <td>
                          <Form.Check
                            onClick={() => tomarSeleccionLlamada(llamada)}
                            reverse
                            name="group1"
                            type={"radio"}
                            id={`reverse-radio-${llamada.id}`}
                          />
                        </td>
                        <td>{llamada.id}</td>
                        <td>{llamada.cliente.nombreCompleto}</td>
                        <td>{llamada.descripcionOperador}</td>
                        <td>{llamada.nombreClienteYEstado[1]}</td>
                        <td>
                          {Math.round(llamada.duracion / 60).toString() +
                            " minutos"}
                        </td>
                      </tr>
                    )
                )}
          </tbody>
        </Table>
      </div>
      {lista === null ? (
        <></>
      ) : (
        <div className="pagination-container d-flex justify-content-center">
          <Pagination className="pagination">
            <Pagination.Prev onClick={() => handlePrev()} />
            <Pagination.Ellipsis onClick={() => handlePaginacion(1)} />
            {paginas.map(
              (pag) =>
                pag >= limitePag[0] &&
                pag <= limitePag[1] && (
                  <Pagination.Item
                    active={itemPaginado === pag - 1}
                    onClick={() => handlePaginacion(pag)}
                  >
                    {pag}
                  </Pagination.Item>
                )
            )}
            <Pagination.Ellipsis
              onClick={() => handlePaginacion(paginas.length)}
            />
            <Pagination.Next onClick={() => handleNext()} />
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default ListaLlamada;
