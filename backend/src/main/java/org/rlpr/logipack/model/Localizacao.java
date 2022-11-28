package org.rlpr.logipack.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Localizacao {
    private String distrito;
    private String concelho;
    private String freguesia;
    private String rua;
    private String codigopostal;
}