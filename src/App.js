import './App.css';
import Encuestas from './components/Encuestas.jsx';
import Navegacion from './components/Navbar.jsx';
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <HashRouter>
        <Navegacion />
        <Routes>
          <Route path="/" element={<>No es parte del CU</>} />
          <Route path="/encuestas" element={<Encuestas />} />
          <Route path="/home" element={<>No es parte del CU</>} />
          <Route path="/llamadas" element={<>No es parte del CU</>} />
          {/* <Route path = "*" element = {<Navigate to= "/" replace />} /> */}
        </Routes>
      </HashRouter>
  );
}

export default App;
