import "./App.css";
import Encuestas from "./components/Encuesta.jsx";
import Navegacion from "./components/Navbar.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";

//Renderizado del frontend, con rutas de navegacion
function App() {
  return (
    <HashRouter>
      <Navegacion />
      <Routes>
        <Route
          path="/"
          element={
            <div className="text-center">
              <h1>No es parte del CU</h1>
            </div>
          }
        />
        <Route path="/encuestas" element={<Encuestas />} />
        <Route
          path="/home"
          element={
            <div className="text-center">
              <h1>No es parte del CU</h1>
            </div>
          }
        />
        <Route
          path="/llamadas"
          element={
            <div className="text-center">
              <h1>No es parte del CU</h1>
            </div>
          }
        />
        <Route
          path="/logout"
          element={
            <div className="text-center">
              <h1>No es parte del CU</h1>
            </div>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
