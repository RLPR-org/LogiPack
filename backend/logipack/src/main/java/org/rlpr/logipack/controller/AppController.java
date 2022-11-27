package org.rlpr.logipack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.rlpr.logipack.model.*;
import org.rlpr.logipack.service.AppService;

import java.util.List;

public class AppController {

    @Autowired
    private AppService appService;

    @GetMapping("/encomendas")
    public List<Encomenda> getAllEncomendas() {
        return appService.getAllEncomendas();
    }

    @GetMapping("/encomendas/{id}")
    public Encomenda getEncomendaById(@PathVariable int id) {
        return appService.getEncomendaById(id);
    }
}
