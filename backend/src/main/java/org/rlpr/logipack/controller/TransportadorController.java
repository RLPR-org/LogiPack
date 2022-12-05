package org.rlpr.logipack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.rlpr.logipack.model.*;
import org.rlpr.logipack.service.TransportadorService;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TransportadorController {

    @Autowired
    private TransportadorService transportadorService;

    @GetMapping("/transportadores")
    public List<Transportador> getAllTransportadores() {
        return transportadorService.getAllTransportadores();
    }

    @GetMapping("/transportadores/{id}")
    public Transportador getTransportadorById(@PathVariable int id) {
        return transportadorService.getTransportadorById(id);
    }

    @PutMapping("estados/transportadores/{id}")
    public Transportador updateEstado(@PathVariable int id, @RequestBody TransportadorEstado estado) {
        return transportadorService.updateEstado(estado, id);
    }
}