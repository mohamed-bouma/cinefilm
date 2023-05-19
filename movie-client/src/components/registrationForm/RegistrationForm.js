import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import { Button } from '@mui/material';
import api from "../../api/axiosConfig";

import "./RegistrationForm.css";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addUser = async (e) => {
    e.preventDefault();
  console.log(firstName,lastName,email,password)
    const newUser = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password
    };
  
    try {
      const response = await api.post("/api/v1/movies/users", newUser);
      console.log(response.data); // Réponse du serveur en cas de succès
      // Effectuer d'autres opérations si nécessaire
    } catch (error) {
      console.error(error); // Gérer les erreurs de requête
    }
  };
 

  return (
    <div className="d-flex justify-content-center">
      <Form className="w-10">
      <h1 className="display-3 titlePage">Inscription</h1>
        <Form.Group controlId="firstName">
          <Form.Label className="label">
            <FontAwesomeIcon icon={faUser} /> Prénom :
          </Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label className="label">
            <FontAwesomeIcon icon={faUser} /> Nom :
          </Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>

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
          <Button variant="outlined" type="submit" onClick={addUser}>
            S'inscrire
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default RegistrationForm;
