package org.rlpr.logipack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.rlpr.logipack.model.*;
import org.rlpr.logipack.model.Mongo.EncomendaMongo;
import org.rlpr.logipack.model.Mongo.NotificacaoCliente;
import org.rlpr.logipack.service.ClienteService;
import org.rlpr.logipack.service.EncomendaService;

import java.util.List;


@RestController
public class EncomendaController {
    
    @Autowired
    private EncomendaService encomendaService;

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/encomendas")
    public List<Encomenda> getEncomendas(
            @RequestParam(value = "estado", defaultValue = "", required = false) String estado
    ) {
        return encomendaService.getEncomendas(estado);
    }

    @GetMapping("/encomendas/{id}")
    public Encomenda getEncomendaById(@PathVariable int id) {
        return encomendaService.getEncomendaById(id);
    }
    
    @GetMapping("/encomendas/ano")
    public List<Integer> getHistoricoAnual() {
        return encomendaService.getHistoricoAnual();
    }
    
    @GetMapping("/encomendas/mes")
    public List<Integer> getHistoricoMensal() {
        return encomendaService.getHistoricoMensal();
    }

    @GetMapping("/encomendas/semana")
    public List<Integer> getHistoricoSemanal() {
        return encomendaService.getHistoricoSemanal();
    }

    @GetMapping("/encomendas/{id}/details")
    public EncomendaMongo getEncomendaDetailsById(@PathVariable int id) {
        return encomendaService.getEncomendaDetailsById(id);
    }

    @PutMapping("cliente/{id}/confirmar/{packageId}")
    public void confirmacaoEncomenda(@PathVariable int packageId) {
        encomendaService.confirmarEncomenda(packageId);
    }

    @GetMapping("/cliente/{id}/encomendas")
    public List<Encomenda> getEncomendasByClienteId(@PathVariable int id) {
        return encomendaService.getEncomendasByClienteId(id);
    }


    @GetMapping("/cliente/{id}/notificacoes")
    public List<NotificacaoCliente> getNotificacoesByClienteId(@PathVariable int id) {
        return clienteService.getNotificacoesByCliente(id);
    }

    @DeleteMapping("/cliente/{id}/notificacoes")
    public void deleteNotificacoesByClienteId(@PathVariable int id) {
        clienteService.deleteNotificacoesByCliente(id);
    }

    @PutMapping("estados/encomendas/{id}")
    public Encomenda updateEstado(@PathVariable int id, @RequestParam EncomendaEstado estado) {
        return encomendaService.updateEstado(estado, id);
    }

}
