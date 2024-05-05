import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import {Navbar} from "../component/Navbar.jsx";

export const Private = () => {
    
    return (
        <div className="container">
            <Navbar />
            <div>Esto es el Private</div>
        </div>
    );
};