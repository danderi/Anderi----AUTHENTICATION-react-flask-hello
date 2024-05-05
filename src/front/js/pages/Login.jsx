import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        setloginData({ ...loginData, [name]: value });
    };
    
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await actions.submitLoginForm(loginData); 
            const token = response.access_token; // Acá es donde se recibe el token
            localStorage.setItem('accessToken', token); // Guarda el token en el localStorage 
            
            setloginData({ email: "", password: "" });// Esto es para limpiar los datos del formulario
           
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                <div>
                    <h4>Ingrese su nombre de usuario y contraseña</h4>
                </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={loginData.email} onChange={handleInputChange} aria-describedby="emailHelp"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={loginData.password} onChange={handleInputChange}></input>
                        </div>
                        <button type="submit" className="btn btn-primary" aria-label="Iniciar sesión">Login</button>
                        <div className="mb-3">
                            <p className="mb-0">¿No tienes una cuenta?</p>
                            <Link to="/signup" className="btn btn-primary">Registrarse</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
