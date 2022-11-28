package org.rlpr.logipack.service;

import org.json.JSONObject;


public class LoggingSevice {

    public static void packageLog(JSONObject data) {
        System.out.println("Nova encomenda: " +  data);
    }

    public static void carLog(JSONObject data) {
        System.out.println("Novo transportador: " +  data);
    }
    
}
