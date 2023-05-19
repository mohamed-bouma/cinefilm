import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Header = ({ isConnected }) => {
  const handleLogout = () => {
    // Implémenter la logique de déconnexion ici
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: "gold" }}>
          <FontAwesomeIcon icon={faClapperboard} />
          CinéFilm
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">
              Accueil
            </NavLink>
            <NavLink className="nav-link" to="/watchList">
              Films à voir
            </NavLink>
          </Nav>
          {!isConnected && (
            <div>
              <Link to="/LoginForm">
                <Button variant="outline-info" className="me-2">
                  Connexion
                </Button>
              </Link>
              <Link to="/RegistrationForm">
                <Button variant="outline-info">Inscription</Button>
              </Link>
            </div>
          )}
          {isConnected && (
            <div>
              <p>Bienvenue, utilisateur connecté !</p>
              <Button variant="outline-info" onClick={handleLogout}>
                Déconnexion
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
