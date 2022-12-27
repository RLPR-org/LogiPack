package org.rlpr.logipack.controller;

import java.util.Map;

import org.rlpr.logipack.others.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.rlpr.logipack.service.*;

@RestController
@RequestMapping("/login")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/cliente")
    public @ResponseBody Map<String, String> clienteLogin(@RequestBody Login login) {
        return authService.clienteCheckLogin(login);
    }

    @PostMapping("/transportador")
    public @ResponseBody Map<String, String> transportadorLogin(@RequestBody Login login) {
        return authService.transportadorCheckLogin(login);
    }

    @PostMapping("/administrador")
    public @ResponseBody Map<String, String> administradorLogin(@RequestBody Login login) {
        return authService.administradorCheckLogin(login);
    }

}
