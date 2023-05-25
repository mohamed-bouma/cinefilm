import { useEffect, useRef, useState } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ getMovieData, movie }) => {
  const revText = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(false); // nouvel état error
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/api/v1/movies/${movieId}/reviews`);
        setReviews(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getMovieData(movieId);
    fetchReviews();
  }, []);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;
    
    if (rev.value.trim().length === 0) {
      setError(true); // met error à true si le champ est vide
      // le champ est vide, on empêche la soumission du formulaire
      return;
    } 

    try {
      const response = await api.post("/api/v1/movies/reviews", {
        reviewBody: rev.value,
        imdbId: movieId,
      });

      const updatedReviews = [...reviews, response.data];

      rev.value = "";

      setReviews(updatedReviews);
    } catch (err) {
      console.error(err);
    }
  };

  const clearInput = () => {
    revText.current.value = "";
  };

  const deleteReview = async (reviewId) => {
    try {
      const updatedReviews = reviews.filter((r) => r.plainTextId !== reviewId);

      await api.delete(`/api/v1/movies/${movieId}/reviews/${reviewId}`);

      setReviews(updatedReviews);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Commentaires</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="imagePoster" />
        </Col>
        <Col>
          <Row>
            <Col>
              <ReviewForm
                handleSubmit={addReview}
                revText={revText}
                labelText="Donne nous ton impression"
                clearInput={clearInput} // passer la fonction clearInput en tant que props
                error={error}
              />
            </Col>
          </Row>
          {error && (
            <Row>
              <Col>
                <p style={{ color: "red" }}>
                  Veuillez remplir le champ avant d'ajouter
                </p>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <hr />
            </Col>
          </Row>
          {isLoading ? (
            <Col>Chargement des commentaires...</Col>
          ) : reviews?.length ? (
            reviews.map((r, index) => {
              if (r.movieId !== movieId) {
                return null;
              }

              return (
                <div key={index}>
                  <Row>
                    <Col>{r.body}</Col>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={() => deleteReview(r.plainTextId)}
                      >
                        Supprimer
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                </div>
              );
            })
          ) : (
            <Row>
              <Col>
                <p>Aucun commentaire pour l'instant.</p>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
