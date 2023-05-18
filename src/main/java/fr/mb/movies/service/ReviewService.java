package fr.mb.movies.service;

import fr.mb.movies.model.Review;
import fr.mb.movies.model.Movie;
import fr.mb.movies.repository.ReviewRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByMovieId(String imdbId) {
        return reviewRepository.findByMovieId(imdbId);
    }

    @Autowired
    private MongoTemplate mongoTemplate;
    public Review createReview(String reviewBody, String imdbId) {
        Review review = reviewRepository.insert(new Review(reviewBody, imdbId));

        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("reviewIds").value(review.getId()))
                .first();

        return review;
    }

//    public void deleteAllReviews(String imdbId) {
//        List<Review> reviews = reviewRepository.findByMovieId(imdbId);
//        if (reviews.isEmpty()) {
//            throw new RuntimeException("No reviews found for movie with imdbId " + imdbId);
//        }
//        reviewRepository.deleteAll(reviews);
//
//        List<ObjectId> reviewIds = reviews.stream().map(Review::getId).collect(Collectors.toList());
//        mongoTemplate.update(Movie.class)
//                .matching(Criteria.where("imdbId").is(imdbId))
//                .apply(new Update().pullAll("reviewIds", reviewIds.toArray()))
//                .first();
//    }

    public void deleteReview(ObjectId id) {
        reviewRepository.deleteById(id);
    }



}
