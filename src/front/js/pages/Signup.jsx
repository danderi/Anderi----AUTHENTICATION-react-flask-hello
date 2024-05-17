import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

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
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (validateForm()) {
          try {
            await actions.submitSignupForm(formData);
            setFormData({
              email: "",
              firstName: "",
              lastName: "",
              password: ""
            });
            navigate("/login");
          } catch (error) {
            console.error("Error:", error);
          }
        }
      };
      


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div>
                        <h4>Registrese</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="exampleInputEmail1" name="email" value={formData.email} onChange={handleInputChange} aria-describedby="emailHelp"></input>
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputFirstName" className="form-label">First Name</label>
                            <input type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} id="exampleInputFirstName" name="firstName" value={formData.firstName} onChange={handleInputChange}></input>
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputLastName" className="form-label">Last Name</label>
                            <input type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} id="exampleInputLastName" name="lastName" value={formData.lastName} onChange={handleInputChange}></input>
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="exampleInputPassword1" name="password" value={formData.password} onChange={handleInputChange}></input>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
