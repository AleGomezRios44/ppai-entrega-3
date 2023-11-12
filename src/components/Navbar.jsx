import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../logo1.png';

function Navegacion() {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand>IVR</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Inicio</Nav.Link>
              <Nav.Link href="#encuestas">Encuestas</Nav.Link>
              <Nav.Link href="#llamadas">Llamadas</Nav.Link>
            </Nav>
            <Container className="text-center">
                <Image src={logo} alt="Logo" fluid />
            </Container>
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
  