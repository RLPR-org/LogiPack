package org.rlpr.logipack.repository.Mongo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.rlpr.logipack.model.Mongo.EncomendaMongo;


public interface EncomendaMongoRepository extends MongoRepository<EncomendaMongo, String> {
    
    EncomendaMongo findByEncomenda(int encomenda);
    boolean existsByEncomenda(int encomenda);
    void deleteByEncomenda(int encomenda);

}
