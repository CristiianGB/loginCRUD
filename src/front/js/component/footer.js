import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./footerStyles.css"

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<span className="notienescuenta">¿No tienes cuenta?</span><Link to="/signup" className="mx-2">Regístrate aquí.</Link>
	</footer>
);
