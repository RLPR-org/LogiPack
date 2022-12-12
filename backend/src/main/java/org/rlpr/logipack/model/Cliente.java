package org.rlpr.logipack.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_cliente")
public class Cliente {

    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String email;
    private String password_hash;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Encomenda> encomendas;
}
