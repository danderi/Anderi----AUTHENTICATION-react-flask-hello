import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";

export const Signup = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });
    const [creatingUser, setCreatingUser] = useState(false); 

    const validateForm = () => {
        const errors = {};
        if (!formData.email) {
            errors.email = 'Email is required';
        }
        if (!formData.firstName) {
            errors.firstName = 'First Name is required';
        }
        if (!formData.lastName) {
            errors.lastName = 'Last Name is required';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error message when user starts typing
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (validateForm()) {
            setCreatingUser(true); // Mostrar el mensaje "creating user"
            try {
                const response = await actions.submitSignupForm(formData);
                if (response.success) {
                    setFormData({
                        email: "",
                        firstName: "",
                        lastName: "",
                        password: ""
                    });
                    setCreatingUser(false); // Ocultar el mensaje "creating user"
                    navigate("/login");
            } else {
                if (response.error === 'Email already exists.') {
                    setErrors({ email: "User already exists. Please use a different email." });
                } else {
                    setErrors({ common: response.error });
                }
                setCreatingUser(false);
            }
            
         } catch (error) {
                console.error("Error:", error);
                setErrors({ common: "An error occurred. Please try again." });
                setCreatingUser(false); // Ocultar el mensaje "creating user"
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h4 className="card-title text-center mb-4">Sign Up</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="exampleInputEmail1"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            aria-describedby="emailHelp"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputFirstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            id="exampleInputFirstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputLastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            id="exampleInputLastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="exampleInputPassword1"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
                    {creatingUser && <p className="text-center mt-3">
                        <span className="dot-flashing-container">
                            <span className="dot-flashing"></span>
                        </span>
                    </p>}
                </form>
                <div className="auth-footer">
                    <p className="mb-0">Already have an account? <Link to="/login" className="btn btn-link">Log In</Link></p>
                </div>
            </div>
        </div>
    );
};



