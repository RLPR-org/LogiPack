package org.rlpr.logipack.receiver;

import java.util.concurrent.CountDownLatch;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class Receiver {
    private CountDownLatch latch = new CountDownLatch(1);

    public void listen(byte[] data) {
        String strData = new String(data);
        JSONObject jsonData = new JSONObject(strData);
        System.out.printf("Message from: %s\n", jsonData);

        //dispatch the queue to a specific service
    }

    public CountDownLatch getLatch() {
        return latch;
    }
}