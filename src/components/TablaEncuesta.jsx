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
        <tr key={encuesta[0]} active>
            <td>{encuesta[0]}</td>
            <td>{encuesta[1]}</td>
            <td>{encuesta[2]}</td>
          </tr>
          <tr active>
            <td></td>
            <td>{encuesta[3]}</td>
            <td>{encuesta[4]}</td>
          </tr>
          {encuesta[5] ?  
          (<tr key={encuesta[5]} active>
            <td></td>
            <td>{encuesta[5]}</td>
            <td>{encuesta[6]}</td>
          </tr>): <></>}
          </tbody>
        }
          
        
      
    </Table>
    </div>
  );
}

export default TablaEncuesta;