import React from 'react';
import {Navigate } from 'react-router-dom';

export default function protectedRoute ({children}) {

    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user.id_rol === 2) {
        return <Navigate to='/visitante'/>
    }
    return children

}
