import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Signup = () => {
    const { store, actions } = useContext(Context);

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado para el mensaje de error

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await actions.submitSignupForm(formData);
            // Limpiar los campos del formulario
            setFormData({
                email: "",
                firstName: "",
                lastName: "",
                password: ""
            });
            // Limpiar el mensaje de error si lo hay
            setErrorMessage("");
        } catch (error) {
            console.error("Error:", error);
            // Configurar el mensaje de error
            setErrorMessage("Failed to submit the form. Please try again.");
        }
    };
    


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={formData.email} onChange={handleInputChange} aria-describedby="emailHelp"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputFirstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="exampleInputFirstName" name="firstName" value={formData.firstName} onChange={handleInputChange}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputLastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="exampleInputLastName" name="lastName" value={formData.lastName} onChange={handleInputChange}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={formData.password} onChange={handleInputChange}></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
