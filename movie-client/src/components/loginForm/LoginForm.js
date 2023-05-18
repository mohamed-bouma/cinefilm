import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import { Button } from '@mui/material';

import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Effectuer des opérations avec les données d'inscription, par exemple :
    console.log(email, password);
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
            S'inscrire
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
