
const email_pattern= /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

export default function Validation(nombre, email, telefono, password, trypassword){
  
    const errors={};
    
    if(nombre === ""){
        errors.nombre = "El campo nombre es requerido";
    }else{
        errors.nombre = "";
    }

    if (email === "") {
        errors.email = "El campo email es requerido";
    }else if(!email_pattern.test(email)) {
        errors.email = "Email incorrecto";
    }else{
        errors.email = "";
    }

    if (password === "" && trypassword === "") {
        errors.password = "El campo contraseña es requerido";
    }else if(trypassword !== password){
        errors.password = "Las contraseñas no coinciden";
    }
    else{
        errors.password = "";
    }

    if (telefono === ""){
        errors.telefono = "El campo telefono es requerido";
    }else{
        errors.telefono = "";
    }

   
     
    return errors;
}



