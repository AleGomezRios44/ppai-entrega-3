import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import logo from "../logo1.png";

//Barra superior de navegacion
function Navegacion() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Image src={logo} alt="Logo" fluid />
          <Nav className="me-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#encuestas">Encuestas</Nav.Link>
            <Nav.Link href="#llamadas">Llamadas</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="#logout">Cerrar Sesion</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Navegacion;
