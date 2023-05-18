package fr.mb.movies.controller;

import fr.mb.movies.model.Review;
import fr.mb.movies.repository.ReviewRepository;
import fr.mb.movies.service.ReviewService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/movies")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping("/reviews")
    public ResponseEntity<Review> createReview(@RequestBody Map<String,String> payload){
        return new ResponseEntity<>(reviewService.createReview(payload.get("reviewBody"), payload.get("imdbId")), HttpStatus.CREATED);
    }

    @GetMapping("/{imdbId}/reviews")
    public ResponseEntity<List<Review>> getReviewsByMovieId(@PathVariable String imdbId) {
        List<Review> reviews = reviewRepository.findByMovieId(imdbId);
        Optional.ofNullable(reviews)
                .orElseGet(ArrayList::new)
                .forEach(review -> review.setPlainTextId(review.getId().toString()));
        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }

    @DeleteMapping("/{imdbId}/reviews/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable String reviewId) {
        Optional<Review> review = reviewRepository.findById(new ObjectId(reviewId));
        if (review.isPresent()) {
            reviewRepository.deleteById(new ObjectId(reviewId));
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
