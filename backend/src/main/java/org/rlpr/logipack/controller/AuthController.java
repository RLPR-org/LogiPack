package org.rlpr.logipack.controller;

import org.rlpr.logipack.others.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.rlpr.logipack.service.*;

@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/cliente/login")
    public Boolean clienteLogin(@RequestBody Login login) {
        return authService.clienteCheckLogin(login);
    }

    @PostMapping("/transportador/login")
    public Boolean transportadorLogin(@RequestBody Login login) {
        return authService.transportadorCheckLogin(login);
    }

    @PostMapping("/administrador/login")
    public Boolean administradorLogin(@RequestBody Login login) {
        return authService.administradorCheckLogin(login);
    }

}
