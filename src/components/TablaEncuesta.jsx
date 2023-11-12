import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

function TablaEncuesta({
    encuesta}) {

  return (
    <div className="d-flex justify-content-center my-2">
    <Table responsive>
      <thead>
        <tr>
          <th>Descripcion:</th>
          <th>Pregunta:</th>
          <th>Respuesta:</th>   
        </tr>
      </thead>
      
        {encuesta === null ? (
          <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        ): <tbody>
        <tr key={encuesta.pregunta1} active>
            <td>{encuesta.descripcion}</td>
            <td>{encuesta.pregunta1}</td>
            <td>{encuesta.respuesta1}</td>
          </tr>
          <tr key={encuesta.pregunta2} active>
            <td></td>
            <td>{encuesta.pregunta2}</td>
            <td>{encuesta.respuesta2}</td>
          </tr>
          {encuesta.pregunta3 ?  
          (<tr key={encuesta.pregunta3} active>
            <td></td>
            <td>{encuesta.pregunta3}</td>
            <td>{encuesta.respuesta3}</td>
          </tr>): <></>}
          </tbody>
        }
          
        
      
    </Table>
    </div>
  );
}

export default TablaEncuesta;