package org.rlpr.logipack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.rlpr.logipack.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    Cliente findById(int id);
    Cliente findByEmail(String email);

}
