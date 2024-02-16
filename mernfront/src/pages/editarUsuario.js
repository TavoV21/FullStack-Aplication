import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';
import details from './details.module.css';

function EditarUsuario(){

  const {id} = useParams();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate(); 


  useEffect(() => {
    Axios.get(`/api/usuario/obtenerId/${id}`).then(res=>{
      console.log(res.data);
      const data = res.data;
      setNombre(data.nombre);
      setEmail(data.email);
      setTelefono(data.telefono);
    }).catch(error=>{
      console.log(error);
    })
  },[]);

   const actualizarUsuario = () =>{
    Axios.put(`/api/usuario/actualizarUsuario/${id}`,{
      nombre:nombre,
      email:email,
      telefono:telefono,
      id: id
    }).then(res =>{
        console.log(res);
        Swal.fire({
          text: 'Usuario actualizado con exito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }) 
        navigate('/lista_usuarios');
    }).catch(error=>{
      console.log(error);
    })

  } 

    return (
    <div className={details.wrapper}>
       <div className={details.container2}>
        <div className={details.row}>
        <h2 className='mt-1'>Editar usuario</h2>

          <div className={details.col}>

            <div className='mb-3'>
              <label htmlFor='nombre' className='form-label'>Nombre:</label>
              <input type='text' className='form-control' value={nombre} onChange={(e)=>{setNombre(e.target.value)}}/>
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Email:</label>
              <input type='email' className='form-control' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className='mb-3'>
              <label htmlFor='telefono' className='form-label'>Telefono:</label>
              <input type='text' className='form-control' value={telefono} onChange={(e)=>{setTelefono(e.target.value)}}/>
            </div>

            <button onClick={actualizarUsuario} className='btn btn-dark rounded-0 mx-auto d-block'>Actualizar Usuario</button>
          </div>
        </div>
        </div>
      </div>
    )
  
}

export default EditarUsuario;