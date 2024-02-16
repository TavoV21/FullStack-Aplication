import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getToken , deleteToken} from './auth-helper.js';

function Navbar(){

const navigate = useNavigate();
const gettingtoken = getToken();
const user = JSON.parse(localStorage.getItem('user'));

function Logout(){
    deleteToken();
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();

  }

   function Rol() {
    if (user.id_rol === 1) {
      return <Link className="navbar-brand text-light" to="/lista_usuarios">Lista Usuarios</Link>

    }else{
      return <Link className="navbar-brand text-light" to="/visitante">Visitante</Link>


    }

  
  } 

    return ( 
    <nav className="navbar navbar-expand-md bg-dark"> 
    {!gettingtoken? 
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">Login</Link>

         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button>   

        <div className="collapse navbar-collapse" id="navbarNav">
           <ul className="navbar-nav">
          <li className="nav-item">
          <Link className="navbar-brand text-light" to="/signup">Registro</Link>
          </li>
          </ul>
        </div>
      </div>

      :<div className="container-fluid">
        <Rol/>                
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav2" aria-controls="navbarNav2" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button> 

        <div className="collapse navbar-collapse justify-content-end me-3" id="navbarNav2">             
          <ul className="navbar-nav">
          <li className="nav-item dropdown">
          <Link type="button" className='nav-link dropdown-toggle text-light' href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Bienvenido {user.nombre}</Link>
              <ul className="dropdown-menu bg-dark">
                <li>
                  <Link type="button" className='dropdown-item bg-dark text-light' onClick={Logout}>Cerrar Session</Link>
                </li>           
              </ul>
          </li>
          </ul>        
         </div>
      </div>
}
  
 </nav>)

}
export default Navbar;





