import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import details from './details.module.css';
import {getToken} from '../components/auth-helper';

/* import UsuarioIndividual from './usuarioIndividual';
 */
function ListaUsuarios(){

  const token = getToken();
  const [dataUsuarios, setDataUsuarios]=useState([]);
  
  useEffect(() => {
   Axios.get('api/usuario/obtenerUsuarios').then(res=>{
      console.log(res.data);
      setDataUsuarios(res.data);
   }).catch(error=>{
    console.log(error);
   })
  }, []);

    const eliminarUsuario = (id) => {
      Swal.fire({
        title: "Estas seguro?",
        text: "El usuario se eliminara!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminalo!"
      }).then((result) => {
        if (result.value) {
          Axios.delete(`/api/usuario/eliminarUsuario/${id}`).then(res=>{
            console.log(res);
            Swal.fire({
              title: "Eliminado!",
              text: "El usuario ha sido eliminado.",
              icon: "success"
            });
            window.location.reload();
          });
        }
      });

    }  

  return <div className={details.wraplist}>
    {token?
  <div>
  <h2>Lista de Usuarios</h2>
    <div className='d-flex justify-content-center'>
    <table className="table w-75">
    <thead>
      <tr>
        <th className='table-dark text-white' scope="col">Id</th>
        <th className='table-dark text-white' scope="col">Nombre</th>
        <th className='table-dark text-white' scope="col">Email</th>
        <th className='table-dark text-white' scope="col">Telefono</th>
        <th className='table-dark text-white' scope="col">Accion</th>
      </tr>
    </thead>
    <tbody>
    {
        dataUsuarios.map(usuario=>(
          <tr key={usuario.id}>
          <td>{usuario.id}</td>
          <td>{usuario.nombre}</td>
          <td>{usuario.email}</td>
          <td>{usuario.telefono}</td>
          <td><Link to={`/editar_usuario/${usuario.id}`}><input type="button" className="btn btn-success" value="Editar"/></Link>&nbsp;
          <input type="button" onClick={()=>{eliminarUsuario(usuario.id)}} className="btn btn-danger" value="Eliminar"/>
          </td>
        </tr>
          
        ))
      }
       
    </tbody>
    </table>

</div>
</div>:
<div><h1>No autorizado</h1></div> 
  }
    
</div>
    
}

export default ListaUsuarios;