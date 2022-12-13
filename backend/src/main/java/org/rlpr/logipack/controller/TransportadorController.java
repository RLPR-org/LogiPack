package org.rlpr.logipack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.rlpr.logipack.model.*;
import org.rlpr.logipack.model.Mongo.TransportadorMongo;
import org.rlpr.logipack.service.TransportadorService;

import java.util.List;


@RestController
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

    @GetMapping("/transportadores/{id}/details")
    public TransportadorMongo getTransportadorDetailsById(@PathVariable int id) {
        return transportadorService.getTransportadorDetailsById(id);
    }

    @PutMapping("estados/transportadores/{id}")
    public Transportador updateEstado(@PathVariable int id, @RequestParam TransportadorEstado estado) {
        return transportadorService.updateEstado(estado, id);
    }
}