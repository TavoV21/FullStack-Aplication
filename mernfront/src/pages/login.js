import React, {useState} from 'react';
import Axios from 'axios';
import details from './details.module.css';
import {setToken, initAxiosInterceptors} from '../components/auth-helper.js';
import {useNavigate } from 'react-router-dom';

initAxiosInterceptors();

function Login(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  
  const loggeo = () =>{
      Axios.post('/api/usuario/login',{
        email: email,
        password: password
      }).then(res=>{
          if (res.data.success === true) {
            var usuario = res.data.result[0];
            navigate('/lista_usuarios');
            localStorage.setItem('user', JSON.stringify(usuario));
            const token = res.data.token;
            setToken(token);
            console.log(token);
          }else{
            console.log(res.data);
            setErrors("Usuario o contraseña incorrecto");
          }
      }).catch(error=>{console.log(error);});
  }

    return (
      <div className={details.wrapper}>
       <div className={details.container3}>
        <div className={details.row}>
        <h2 className='mt-1'>Login</h2>

          <div className={details.col}>

            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Email:</label>
              <input type='email' className='form-control' id="email" placeholder='example@gmail.com' onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Contraseña:</label>
              <input type='password' className='form-control' id="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>

            <p style={{color:"red"}}>{errors}</p>

            <button onClick={loggeo} className='btn btn-dark rounded-0 mx-auto d-block'>Iniciar Session</button>
          </div>
        </div>
        </div>
      </div>)
}


export default Login;
