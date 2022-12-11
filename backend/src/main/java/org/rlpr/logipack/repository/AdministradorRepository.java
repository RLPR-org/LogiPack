package org.rlpr.logipack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.rlpr.logipack.model.Administrador;
public interface AdministradorRepository extends JpaRepository<Administrador, Integer> {

    Administrador findById(int id);

    Administrador findByEmail(String email);
}
