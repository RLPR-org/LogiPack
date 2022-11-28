package org.rlpr.logipack.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

import org.rlpr.logipack.service.AppService;
import org.rlpr.logipack.model.*;
import org.rlpr.logipack.repository.*;

public class LoggingSevice {

    @Autowired
    private AppService appService;

    public void CarLog(JSONObject data) {
        System.out.println("appends the car Log -> " +  data);

    }

    public void reciptConfimation(JSONObject data){

        int id = data.getInt("encomenda_id");

        Estado estado = Estado.ENTREGUE;
        
        appService.updateEstado(estado,id);

    }

}
