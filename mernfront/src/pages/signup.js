import React, { useState, useEffect } from 'react';
import uniquid from 'uniquid';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {useNavigate } from 'react-router-dom';
import details from './details.module.css';
import Validation from '../components/validation.js';
import {setToken, initAxiosInterceptors} from '../components/auth-helper.js';

initAxiosInterceptors();

function Signup() {

  const url = 'api/usuario/signup';
  
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [trypassword, setTrypassword] =useState('');
  const [idrol, setIdRol] = useState(0);
  const [error, setErrors] = useState({});
  const [dataRoles, setDataRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/api/usuario/obtenerRol`).then(res=>{
      console.log(res.data);
      setDataRoles(res.data);
    }).catch(err=>{
      console.log(err);
    })
  }, [])


 const añadirUsuario = () =>{

  const rolId = parseInt(idrol);
  const datos = {
    nombre:nombre,
    email:email,
    password:password,
    telefono:telefono,
    id_rol: rolId, 
    id: uniquid()
  }
  Axios.post(url,datos).then(res =>{
    localStorage.setItem('user',JSON.stringify(datos));
    console.log(res.data);
    setToken(res.data.token);
    Swal.fire({
      text: 'Usuario registrado con exito',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: 'green'
    })   
      navigate('/lista_usuarios');

  }).then(error=>{
    console.log(error);
  })  
} 

const formValidation = (e) =>{
    e.preventDefault();
    setErrors(Validation(nombre, email, telefono, password, trypassword));
    
    if (error.nombre === "" && error.email === "" && error.telefono === "" && error.password === "") {
      añadirUsuario();
    }
   
}

  return (
      <div className={details.wrapper}>
      <div className={details.container}>
       
        <div className="row">
        <h2>Registro de usuario</h2>

          <div className={details.col}>
          
          <div className="row">
          <div className="col-md-8">
            <div className='mb-3'>
              <label htmlFor='nombre' className='form-label'>Nombre:</label>
              <input type='text' className='form-control' id='nombre'  onChange={(e)=>{setNombre(e.target.value)}}/>
              {error.nombre && <p style={{color:"red"}}>{error.nombre}</p>}
            </div>
            </div>

            <div className='col-md-4 '>
            <div className='mb-3'>
            <label htmlFor='nombre' className='form-label'>Rol:</label>          
            <select onChange={(e)=>{setIdRol(e.target.value)}} className="form-select form-select-sm"  aria-label=".form-select-sm example">
            { 
            dataRoles.map(r=>(
              <option key={r.id} value={r.id} >{r.rol}</option>
              ))
            }
            </select>         
            </div>
            </div>
            </div>

            <div className="row">
            <div className="col-md-8">
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Email:</label>
              <input type='email' className='form-control' id='email' placeholder='example@gmail.com'  onChange={(e)=>{setEmail(e.target.value)}}/>
              {error.email && <p style={{color:"red"}}>{error.email}</p>}
            </div>
            </div>

            <div className="col-md-4">
            <div className='mb-3'>
              <label htmlFor='telefono' className='form-label'>Telefono:</label>
              <input type='text' className='form-control' id='telefono'  onChange={(e)=>{setTelefono(e.target.value)}}/>
              {error.telefono && <p style={{color:"red"}}>{error.telefono}</p>}

            </div>
            </div>
            </div>

            <div className="row">
            <div className="col-md-6">
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Contraseña:</label>
              <input type='password' className='form-control' id='password'  onChange={(e)=>{setPassword(e.target.value)}} minLength="3" maxLength="8"/>
               {error.password && <p style={{color:"red"}}>{error.password}</p>}
            </div>
            </div>

            <div className="col-md-6">
            <div className='mb-3'>
              <label htmlFor='trypassword' className='form-label'>Comfirmar contraseña:</label>
              <input type='password' className='form-control' id='trypassword'  onChange={(e)=>{setTrypassword(e.target.value)}} minLength="3" maxLength="8"/>
             {error.password && <p style={{color:"red"}}>{error.password}</p>}
            </div>
            </div>
            </div>
            </div>
            <div className="col">
            <button onClick={formValidation} className='btn btn-dark rounded-0 mx-auto d-block'>Inscribirse</button>
            </div>

        </div>
        </div>
        </div>
    )
  }

  export default Signup;
