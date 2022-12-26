package org.rlpr.logipack.service;

import org.rlpr.logipack.others.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

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

    private final JwtEncoder encoder;

    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }


    public int clienteCheckLogin(Login login) {
        Cliente cliente = clienteRepository.findByEmail(login.getEmail());
        if (cliente == null) return -1;
        if (login.checkLogin(cliente.getPassword_hash())){
            return cliente.getId();
        }
        return -1;
    }

    public int transportadorCheckLogin(Login login) {
        Transportador transportador = transportadorRepository.findByEmail(login.getEmail());
        if (transportador == null) return -1;
        if (login.checkLogin(transportador.getPassword_hash())) {
            return transportador.getId();
        }
        return -1;
    }

    public int administradorCheckLogin(Login login) {
        Administrador administrador = administradorRepository.findByEmail(login.getEmail());
        if (administrador == null) return -1;
        if (login.checkLogin(administrador.getPassword_hash())) {
            return administrador.getId();
        }
        return -1;
    }

    public AuthService(JwtEncoder encoder) {
        this.encoder = encoder;
    }
}
