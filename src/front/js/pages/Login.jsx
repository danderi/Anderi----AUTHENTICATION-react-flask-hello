import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/index.css";

export const Login = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await actions.submitLoginForm(loginData);
            if (response.success) {
                setLoginData({ email: "", password: "" });
                navigate("/private");
            } else {
                if (response.error === "User not found.") {
                    setErrors({ email: "User not found. Please check your email." });
                    setErrors(prevErrors => ({ ...prevErrors, password: "" })); // Limpiar mensaje de error de contraseña si existe
                } else if (response.error === "Invalid password.") {
                    setErrors({ password: "Invalid password. Please try again." });
                    setErrors(prevErrors => ({ ...prevErrors, email: "" })); // Limpiar mensaje de error de email si existe
                } else if (response.error === "Email and password are required.") {
                    setErrors({ common: response.error });
                } else {
                    setErrors({ common: response.error });
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setErrors({ common: "An error occurred. Please try again." });
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
                            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="exampleInputEmail1" name="email" value={loginData.email} onChange={handleInputChange} aria-describedby="emailHelp"></input>
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className={`form-control ${errors.password || (errors.common && !loginData.password) ? 'is-invalid' : ''}`} id="exampleInputPassword1" name="password" value={loginData.password} onChange={handleInputChange}></input>
                            {(errors.password || (errors.common && !loginData.password)) && <div className="invalid-feedback">{errors.password || "Password is required"}</div>}
                        </div>
                        {errors.common && !errors.password && <div className="alert alert-danger">{errors.common}</div>}
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
