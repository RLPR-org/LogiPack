package org.rlpr.logipack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.rlpr.logipack.model.Localizacao;

public interface LocalizacaoRepository extends JpaRepository<Localizacao, Integer> {
    
}
