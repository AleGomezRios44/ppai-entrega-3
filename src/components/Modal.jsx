import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Table } from "react-bootstrap";
import TablaEncuesta from "./TablaEncuesta";
import Row from "react-bootstrap/Row";

function ModalCSV({ llamada, encuesta, cerrar }) {
  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "absolute",
        zIndex: 1000, // Ajusta este valor según sea necesario
      }}
    >
      <Modal.Dialog style={{ width: '80%', height: '80%', margin: 'auto', top: '50%', transform: 'translateY(-50%)' }}>
        <Modal.Header closeButton onClick={() => cerrar()}>
          <Modal.Title>CSV</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ height: 'calc(100% - 115px)' }}>
          <div className="d-flex flex-column" style={{ height: '100%' }}>
            <Row className="justify-content-center align-items-center min-vh-10 g-2">
              <Table responsive>
                <thead>
                  <tr>
                    <th>Llamada</th>
                    <th>Cliente</th>
                    <th>Estado Actual</th>
                    <th>Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={llamada.id} active>
                    <td>{llamada.id}</td>
                    <td>{llamada.cliente.nombreCompleto}</td>
                    <td>{llamada.nombreClienteYEstado[1]}</td>
                    <td>
                      {Math.round(llamada.duracion / 60).toString() + " minutos"}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Row>
            <Row className="justify-content-center align-items-center min-vh-10 g-2">
              <TablaEncuesta encuesta={encuesta} />
            </Row>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => cerrar()} variant="secondary">
            Cerrar
          </Button>
          <Button onClick={() => cerrar()} variant="primary">
            Descargar
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalCSV;
