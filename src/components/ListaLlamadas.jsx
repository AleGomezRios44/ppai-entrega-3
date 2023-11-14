import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import PantallaEncuestas from "../services/PantallaEncuestas";
import Swal from "sweetalert2";

function ListaLlamada({ lista, tomarEncuesta, tomarLlamada }) {
  const [itemPaginado, setItemPaginado] = useState(0);
  const [limitePag, setLimitePag] = useState([1, 3]);
  
  useEffect(() => {
  }, []);

  let paginas = []; 
  if (lista !== null){
    for (let i = 0; i < lista.length; i++) {
      paginas.push(i + 1);
    }
  }
  
  const handlePaginacion = (numPag) => {
    setItemPaginado(numPag - 1);
    setLimitePag([numPag -1, numPag + 1])
    
  };

  const handleNext = () => {
    setItemPaginado((prevItemPaginado) => {
      if (prevItemPaginado < lista.length - 1) {
        setLimitePag([prevItemPaginado + 1, prevItemPaginado + 3]);
        return prevItemPaginado + 1;
      }
      return prevItemPaginado;
    });
  };
  
  const handlePrev = () => {
    setItemPaginado((prevItemPaginado) => {
      if (prevItemPaginado > 0) {
        setLimitePag([prevItemPaginado - 1, prevItemPaginado + 1]);
        return prevItemPaginado - 1;
      }
      return prevItemPaginado;
    });
  };
  
  const tomarSeleccionLlamada = async (llamada) => {
    const encuesta = await PantallaEncuestas.pedirSeleccionLlamada(llamada.id)
    if(encuesta === "ERROR"){
      tomarEncuesta(null)
      Swal.fire({
        text: "Ha habido un error con el servidor, recargue la página he intente nuevamente",
        icon: "error",
        confirmButtonText: "Aceptar",
      })
    }
    else{
      tomarEncuesta(encuesta)
    }
    tomarLlamada(llamada)
  } 

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
                    (llamada.id ) && (
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
                          {Math.round(llamada.duracion/60).toString() + " minutos"}
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
            <Pagination.Prev onClick={() => handlePrev()}/>
            <Pagination.Ellipsis onClick={() => handlePaginacion(1)}/>
            {paginas.map((pag) => (
            (pag >= limitePag[0] && pag <= limitePag[1]) &&
            <Pagination.Item active={itemPaginado === pag -1} onClick={() => handlePaginacion(pag)}>
              {pag}
            </Pagination.Item>
          ))}
            <Pagination.Ellipsis onClick={() => handlePaginacion(paginas.length)}/>
            <Pagination.Next onClick={() => handleNext()}/>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default ListaLlamada;
