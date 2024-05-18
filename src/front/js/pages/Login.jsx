import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";

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
        setErrors({ ...errors, [name]: '' }); // Clear error message when user starts typing
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
                } else if (response.error === "Invalid password.") {
                    setErrors({ password: "Invalid password. Please try again." });
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
        <div className="auth-container">
            <div className="auth-card">
                <h4 className="card-title mb-4">Log In</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                            id="exampleInputEmail1" 
                            name="email" 
                            value={loginData.email} 
                            onChange={handleInputChange} 
                            aria-describedby="emailHelp"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className={`form-control ${errors.password || (errors.common && !loginData.password) ? 'is-invalid' : ''}`} 
                            id="exampleInputPassword1" 
                            name="password" 
                            value={loginData.password} 
                            onChange={handleInputChange}
                        />
                        {(errors.password || (errors.common && !loginData.password)) && <div className="invalid-feedback">{errors.password || "Password is required"}</div>}
                    </div>
                    {errors.common && !errors.password && <div className="alert alert-danger">{errors.common}</div>}
                    <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                </form>
                <div className="auth-footer">
                    <p className="mb-0">Don't have an account? <Link to="/signup" className="btn btn-link">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

