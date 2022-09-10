import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate()
  const handleLogin = async (username, password) => {
    actions.login(username, password).then(()=>{ //.then => cuando acabe de hacer el promise ==== navigate
      navigate("/profile")
    })
  };

  return (
    <section className="form-login">
      <h5>Formulario Login</h5>
      <input
        className="controls"
        type="text"
        name="usuario"
        placeholder="Usuario"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        onKeyDown={(e)=>{
          if(e.key=="Enter"){
            handleLogin(username, password)
          }
        }}
      />
      <input
        className="controls"
        type="password"
        name="contrasena"
        placeholder="Contraseña"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyDown={(e)=>{
          if(e.key=="Enter"){
            handleLogin(username, password)
          }
        }}
      />
      <input
        className="buttons"
        type="submit"
        onClick={() => handleLogin(username, password)}
        name=""
        value="Ingresar"
      />
      <p>
        <a href="https://www.youtube.com/watch?v=jvpHI7PsQr0">¿Olvidastes tu Contraseña?</a>
      </p>
    </section>
  );
};
// history.push hook useHistory o navigate
