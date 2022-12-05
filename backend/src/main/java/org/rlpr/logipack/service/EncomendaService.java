package org.rlpr.logipack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.rlpr.logipack.model.*;
import org.rlpr.logipack.repository.*;

import java.util.List;


@Service
public class EncomendaService {

    @Autowired
    private EncomendaRepository encomendaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    public Encomenda getEncomendaById(int id) {
        // TODO mudar para ter o historico
        return encomendaRepository.findById(id);
    }

    public List<Encomenda> getAllEncomendas() {
        return encomendaRepository.findAll();
    }

    public Encomenda createEncomenda(Encomenda encomenda) {
        return encomendaRepository.save(encomenda);
    }

    public Encomenda updateEstado(EncomendaEstado estado, int id) {
        return encomendaRepository.updateEstado(estado, id);
    }

    public Encomenda updateConfirmacao(int id) {
        return encomendaRepository.updateConfirmacao(id);
    }

    public List<Encomenda> getEncomendasByClienteId(int id) {
        // TODO mudar para ter o historico
        return clienteRepository.findById(id).getEncomendas();
    }
}