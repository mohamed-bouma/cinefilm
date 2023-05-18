package fr.mb.movies.repository;

import fr.mb.movies.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    User findByEmail(String email);

    void deleteById(ObjectId id);
}
