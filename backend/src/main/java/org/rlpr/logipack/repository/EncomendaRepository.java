package org.rlpr.logipack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.rlpr.logipack.model.Encomenda;
import org.rlpr.logipack.model.EncomendaEstado;

import java.util.List;

public interface EncomendaRepository extends JpaRepository<Encomenda, Integer> {

    Encomenda findById(int id);

    List<Encomenda> findAll();

    // update encomenda set estado = ? where id = ?
    @Query("update Encomenda e set e.estado = ?1 where e.id = ?2")
    Encomenda updateEstado(EncomendaEstado estado, int id);

    @Query("update Encomenda e set.confirmacao = TRUE where e.id = ?1")
    Encomenda updateConfirmacao(int id);

}