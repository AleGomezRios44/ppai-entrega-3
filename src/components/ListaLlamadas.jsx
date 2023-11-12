import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

function ListaLlamada({ lista }) {
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
    if (itemPaginado < lista.length - 1) {
      setItemPaginado(itemPaginado + 1);
      setLimitePag([itemPaginado -1, itemPaginado + 2])
    }
  };

  const handlePrev = () => {
    if (itemPaginado > 0) {
      setItemPaginado(itemPaginado - 1);
      setLimitePag([itemPaginado -1, itemPaginado + 1])
    }  
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
              <th>Encuesta Enviada</th>
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
                            reverse
                            name="group1"
                            type={"radio"}
                            id={`reverse-radio-${llamada.id}`}
                          />
                        </td>
                        <td>{llamada.id}</td>
                        <td>{llamada.cliente}</td>
                        <td>{llamada.tieneEncuesta ? "Sí" : "No"}</td>
                        <td>{llamada.estado}</td>
                        <td>
                          {llamada.duracion > 1
                            ? llamada.duracion.toString() + " minutos"
                            : llamada.duracion === 1
                            ? llamada.duracion.toString() + " minuto"
                            : (llamada.duracion * 60).toString() + " segundos"}
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
            <Pagination.Item onClick={() => handlePaginacion(pag)} active={itemPaginado === pag -1}>
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
