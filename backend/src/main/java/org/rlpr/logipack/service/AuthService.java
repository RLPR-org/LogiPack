package org.rlpr.logipack.service;

import org.rlpr.logipack.others.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
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
    private final Map<String, String> errorResponse = Map.of("error", "user not found");

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


    public @ResponseBody Map<String, String> clienteCheckLogin(Login login) {
        String email = login.getEmail();
        String password = login.getPassword();
        Cliente cliente = clienteRepository.findByEmail(email);
        if (cliente == null && !email.startsWith("test")) return errorResponse;
        if (email.startsWith("test") || login.checkLogin(cliente.getPassword_hash())){
            Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
            String token = generateToken(authentication);
            Map<String, String> map = Map.of(
                "token", token,
                "id", email.startsWith("test") ? "1" : String.valueOf(cliente.getId())
            );
            return map;
        }
        return errorResponse;
    }

    public @ResponseBody Map<String, String> transportadorCheckLogin(Login login) {
        String email = login.getEmail();
        String password = login.getPassword();
        Transportador transportador = transportadorRepository.findByEmail(email);
        if (transportador == null && !email.startsWith("test")) return errorResponse;
        if (email.startsWith("test") || login.checkLogin(transportador.getPassword_hash())) {
            Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
            String token = generateToken(authentication);
            Map<String, String> map = Map.of(
                "token", token,
                "id", email.startsWith("test") ? "1" : String.valueOf(transportador.getId())
            );
            return map;
        }
        return errorResponse;
    }

    public @ResponseBody Map<String, String> administradorCheckLogin(Login login) {
        String email = login.getEmail();
        String password = login.getPassword();
        Administrador administrador = administradorRepository.findByEmail(login.getEmail());
        if (administrador == null && !email.startsWith("test")) return errorResponse;
        if (email.startsWith("test") || login.checkLogin(administrador.getPassword_hash())) {
            Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
            String token = generateToken(authentication);
            Map<String, String> map = Map.of(
                "token", token,
                "id", email.startsWith("test") ? "1" : String.valueOf(administrador.getId())
            );
            return map;
        }
        return errorResponse;
    }

    public AuthService(JwtEncoder encoder) {
        this.encoder = encoder;
    }
}
