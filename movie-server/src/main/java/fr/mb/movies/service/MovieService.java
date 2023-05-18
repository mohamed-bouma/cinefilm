package fr.mb.movies.service;

import fr.mb.movies.model.Movie;
import fr.mb.movies.repository.MovieRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> allMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> sigleMovie(String imdbId){
        return movieRepository.findMovieByImdbId(imdbId);
    }
}
