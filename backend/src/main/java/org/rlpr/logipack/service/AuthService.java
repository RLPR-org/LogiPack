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

    public Boolean clienteCheckLogin(Login login) {
        Cliente cliente = clienteRepository.findByEmail(login.getEmail());
        if (cliente == null) {
            return false;
        }
        return login.checkLogin(cliente.getPassword_hash());
    }

    public Boolean transportadorCheckLogin(Login login) {
        Transportador transportador = transportadorRepository.findByEmail(login.getEmail());
        if (transportador == null) {
            return false;
        }
        return login.checkLogin(transportador.getPassword_hash());
    }

    public Boolean administradorCheckLogin(Login login) {
        Administrador administrador = administradorRepository.findByEmail(login.getEmail());
        if (administrador == null) {
            return false;
        }
        return login.checkLogin(administrador.getPassword_hash());
    }
}
