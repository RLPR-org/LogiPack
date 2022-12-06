package org.rlpr.logipack.repository.Mongo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.rlpr.logipack.model.Mongo.TransportadorMongo;

public interface TransportadorMongoRepository extends MongoRepository<TransportadorMongo, String> {

    TransportadorMongo findByTransportador(int transportador);
    
}
