package org.rlpr.logipack.repository.Mongo;
import org.rlpr.logipack.model.Mongo.HistoricoTemporal;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HistoricoTemporalRepository extends MongoRepository<HistoricoTemporal, String> {
    
}