import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import {getToken} from '../components/auth-helper';
import details from './details.module.css';

function ListaUsuarios(){

  const token = getToken();
  const [dataUsuarios, setDataUsuarios]=useState([]);
  const [buscar, setBuscar] = useState('');
  
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
    
      let results = [];

      if (!buscar) {
        results= dataUsuarios;
      }else{
        results = dataUsuarios.filter((data)=>
        data.nombre.toLowerCase().includes(buscar.toLocaleLowerCase())
        )
      }
    
  return <div className={details.wraplist}>
    {token?
  <div className="row justify-content-center">

  <h2>Lista de Usuarios</h2>

<div className={details.inputwrapper}>
  <input type="text" class="form-control" className={details.inputsearch} placeholder="Buscar..." aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e)=>{setBuscar(e.target.value)}} value={buscar}/>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={details.inputicon} viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
</div>

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
        results.map(usuario=>(
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

</div>:
<div><h1>No autorizado</h1></div> 
  }
    
</div>
    
}

export default ListaUsuarios;