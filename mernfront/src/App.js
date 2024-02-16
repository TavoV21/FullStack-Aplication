import './App.css';
import EditarUsuario from './pages/editarUsuario';
import ListaUsuarios from './pages/listaUsuarios';
import Signup from './pages/signup';
import Login from './pages/login';
import Visitante from './pages/visitante';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import ProtectedRoute from './components/protectedRoute';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' Component={Login}/>
        <Route path='/lista_usuarios' element={
          <ProtectedRoute>
            <ListaUsuarios/>
          </ProtectedRoute>
        }/>
        <Route path='/visitante' Component={Visitante}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/editar_usuario/:id' Component={EditarUsuario}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
