package org.rlpr.logipack.service;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
import org.springframework.stereotype.Service;
import org.rlpr.logipack.model.*;
import org.rlpr.logipack.repository.*;

import java.util.List;


@Service
public class AppService {

    @Autowired
    private EncomendaRepository encomendaRepository;

    public Encomenda getEncomendaById(int id) {
        return encomendaRepository.findById(id);
    }

    public List<Encomenda> getAllEncomendas() {
        return encomendaRepository.findAll();
    }

    public Encomenda createEncomenda(Encomenda encomenda) {
        return encomendaRepository.save(encomenda);
    }

    public Encomenda updateEstado(Estado estado, int id) {
        return encomendaRepository.updateEstado(estado, id);
    }
}
