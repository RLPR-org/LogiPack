package org.rlpr.logipack.receiver;

import java.util.concurrent.CountDownLatch;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.rlpr.logipack.service.EventHandlerService;


@Component
public class Receiver {
    private CountDownLatch latch = new CountDownLatch(1);
    
    @Autowired
    private EventHandlerService eventHandler;

    public void listen(byte[] data) {
        String strData = new String(data);
        JSONObject jsonData = new JSONObject(strData);
        System.out.printf("\n\nMessage from: %s\n", jsonData);

        //this class must be static. Why?? Dont know, otherwise this will print things in loop
        //LoggingSevice.packageLog(jsonData);
        eventHandler.insertEncomenda(strData);
    }

    public CountDownLatch getLatch() {
        return latch;
    }
}
