import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import { Button } from "@mui/material";
import api from "../../api/axiosConfig";
import { Navigate, useNavigate } from "react-router-dom";

import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/api/v1/movies/users/login", { email, password })
      .then((response) => {
        console.log("Utilisateur connecté :", response.data);
        setIsConnected(true); // Mettre à jour l'état de connexion réussie
        navigate("/"); // Rediriger vers "/"
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
        setErrorMessage("L'e-mail ou le mot de passe est incorrect.");
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <Form onSubmit={handleSubmit} className="w-10">
        <h1 className="display-3 titlePage">Connexion</h1>
        <Form.Group controlId="email">
          <Form.Label className="label">
            <FontAwesomeIcon icon={faEnvelope} /> Email :
          </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ex : jean@gmail.com"
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className="label">
            <FontAwesomeIcon icon={faLock} /> Mot de passe :
          </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="submit-btn">
          <Button variant="outlined" type="submit">
            Se connecter
          </Button>
        </div>
        {isConnected && <p>Utilisateur connecté avec succès !</p>}
        {/* Afficher le message de confirmation de la connexion */}
        {errorMessage && <p>L'email ou le mot de passe est incorrect</p>}
        {/* Afficher le message d'erreur */}
      </Form>
    </div>
  );
}

export default LoginForm;
