package org.rlpr.logipack.service;

import org.rlpr.logipack.others.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.rlpr.logipack.model.*;
import org.rlpr.logipack.repository.*;

@Service
public class AuthService {

    @Autowired
    private ClienteRepository clienteRepository;
    @Autowired
    private TransportadorRepository transportadorRepository;
    @Autowired
    private AdministradorRepository administradorRepository;

    public int clienteCheckLogin(Login login) {
        Cliente cliente = clienteRepository.findByEmail(login.getEmail());
        if (cliente == null) {
            return -1;
        }
        if (login.checkLogin(cliente.getPassword_hash())){
            return cliente.getId();
        }
        return -1;
    }

    public int transportadorCheckLogin(Login login) {
        Transportador transportador = transportadorRepository.findByEmail(login.getEmail());
        if (transportador == null) {
            return -1;
        }
        if (login.checkLogin(transportador.getPassword_hash())) {
            return transportador.getId();
        }
        return -1;
    }

    public int administradorCheckLogin(Login login) {
        Administrador administrador = administradorRepository.findByEmail(login.getEmail());
        if (administrador == null) {
            return -1;
        }
        if (login.checkLogin(administrador.getPassword_hash())) {
            return administrador.getId();
        }
        return -1;
    }
}
