package org.rlpr.logipack.model.Mongo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import lombok.Data;

@Data
public class HistoricoMeses {
    private Map<String, List<Integer>> historico_meses;

    public HistoricoMeses() {
        this.historico_meses = new HashMap<>();
    }

    public void initilizeMonth(String month) {
        historico_meses.put(month, new ArrayList<>());
        List<Integer> days = historico_meses.get(month);

        for (int i=0; i<31; i++)
            days.add(0);
    }

}
