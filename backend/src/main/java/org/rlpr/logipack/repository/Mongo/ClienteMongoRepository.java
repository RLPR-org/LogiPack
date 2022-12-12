package org.rlpr.logipack.repository.Mongo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.rlpr.logipack.model.Mongo.ClienteMongo;


public interface ClienteMongoRepository extends MongoRepository<ClienteMongo, String> {
    
}
