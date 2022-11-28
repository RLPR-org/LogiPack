package org.rlpr.logipack.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_localizacao")
public class Localizacao {
    @Id
    @GeneratedValue
    private int id;
    private String distrito;
    private String concelho;
    private String freguesia;
    private String rua;
    private String codigopostal;
}