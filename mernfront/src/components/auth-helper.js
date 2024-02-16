import React from 'react'
import Axios from 'axios'; 
  

    export function setToken(token){
         localStorage.setItem('jsonwebtoken', token);

    }

    export function getToken (){
        return localStorage.getItem('jsonwebtoken');

    }

    export function deleteToken (){
        localStorage.removeItem('jsonwebtoken');
    }

    export function initAxiosInterceptors(){

        Axios.interceptors.request.use(function(config){
            const token = getToken();

            if (token) {
                config.headers.Authorization =`bearer ${token}`;
            }

            return config;
        });

        Axios.interceptors.response.use(function(response){
                console.log(response);             
                return response;

        });
    }

 
