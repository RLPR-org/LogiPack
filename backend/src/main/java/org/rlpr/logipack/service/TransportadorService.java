package org.rlpr.logipack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.rlpr.logipack.model.*;
import org.rlpr.logipack.repository.*;

import java.util.List;

@Service
public class TransportadorService {

    @Autowired
    private TransportadorRepository transportadorRepository;

    public Transportador getTransportadorById(int id) {
        // TODO mudar para ter o historico
        return transportadorRepository.findById(id);
    }

    public List<Transportador> getAllTransportadores() {
        return transportadorRepository.findAll();
    }

    public Transportador createTransportador(Transportador transportador) {
        return transportadorRepository.save(transportador);
    }

    public Transportador updateEstado(TransportadorEstado estado, int id) {
        return transportadorRepository.updateEstado(estado, id);
    }
}
