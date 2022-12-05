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
@Table(name = "tbl_transportador")
public class Transportador {

    @Id
    @GeneratedValue
    private int id;

    private TransportadorEstado estado;

    @OneToMany(mappedBy = "transportador")
    private List<Encomenda> encomendas;
}
