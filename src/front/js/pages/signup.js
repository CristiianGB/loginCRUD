import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { Login } from "./login";

export const Signup = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  let navigate = useNavigate();
  // hacer signup en actions y llamar a actions desde aqui
  const handleSignup = async () => {
    const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        fullname: fullname,
        password: password,
      }),
    });

    if (!resp.ok) throw Error("There was a problem in the signup request");

    if (resp.status === 401) {
      throw "Invalid credentials";
    } else if (resp.status === 400) {
      throw "Invalid email or password format";
    }
    const data = await resp.json();
    // save your token in the localStorage
    //also you should set your user into the store using the setStore function

    // localStorage.setItem("jwt-token", data.token);
    navigate("/")
  };

  return (
    <section className="form-register">
      <h4>Formulario Registro</h4>
      <input
        className="controls"
        type="text"
        name="nombres"
        id="nombres"
        placeholder="Ingrese su Usuario"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        className="controls"
        type="text"
        name="apellidos"
        id="apellidos"
        placeholder="Ingrese su Nombre Completo"
        onChange={(e) => {
          setFullname(e.target.value);
        }}
      />
      <input
        className="controls"
        type="email"
        name="correo"
        id="correo"
        placeholder="Ingrese su Correo electrónico"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="controls"
        type="password"
        name="contraseña"
        id="password"
        placeholder="Ingrese su Contraseña"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <p>
        Al registrarse validará <a href="https://www.laps4.com/comunidad/threads/los-10-troll-mandamientos.343028/">Terminos y Condiciones</a>
      </p>
      <button
        className="botons"
        onClick={() => {
          handleSignup();
        }}
        value="Registrar"
      >
        Registrar
      </button>
      <p>
        <Link to="/">Ya tengo cuenta.</Link>
      </p>
    </section>
  );
};

Signup.propTypes = {
  match: PropTypes.object,
};
