package org.rlpr.logipack.repository;

import org.rlpr.logipack.model.Encomenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.rlpr.logipack.model.Cliente;
import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    Cliente findById(int id);

}
