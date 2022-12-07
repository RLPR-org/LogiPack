package org.rlpr.logipack.repository;

import org.rlpr.logipack.model.TransportadorEstado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.rlpr.logipack.model.Transportador;

import java.util.List;

public interface TransportadorRepository extends JpaRepository<Transportador, Integer> {

    Transportador findById(int id);

    List<Transportador> findAll();

    @Query("update Transportador e set e.estado = ?1 where e.id = ?2")
    Transportador updateEstado(TransportadorEstado estado, int id);
}