package org.rlpr.logipack.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.rlpr.logipack.model.*;
import org.rlpr.logipack.model.Mongo.EncomendaEstadoMongo;
import org.rlpr.logipack.model.Mongo.EncomendaMongo;
import org.rlpr.logipack.model.Mongo.NotificacaoCliente;
import org.rlpr.logipack.repository.*;
import org.rlpr.logipack.repository.Mongo.ClienteMongoRepository;
import org.rlpr.logipack.repository.Mongo.EncomendaMongoRepository;
import org.rlpr.logipack.repository.Mongo.HistoricoTemporalRepository;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@Service
public class EncomendaService {

    @Autowired
    private EncomendaRepository encomendaRepository;

    @Autowired
    private EncomendaMongoRepository encomendaMongoRepository;

    @Autowired
    private ClienteMongoRepository clienteMongoRepo;

    @Autowired
    private HistoricoTemporalRepository historicoTemporalRepo;


    public Encomenda getEncomendaById(int id) {
        return encomendaRepository.findById(id);
    }

    public EncomendaMongo getEncomendaDetailsById(int id) {
        return encomendaMongoRepository.findByEncomenda(id);
    }

    public List<Encomenda> getAllEncomendas() {
        return encomendaRepository.findAll();
    }

    public List<Encomenda> getEncomendas(String estado){
        if (estado.equals("")){
            return encomendaRepository.findAll();
        }
        return encomendaRepository.findByEstado(EncomendaEstado.valueOf(estado));
    }

    public Encomenda createEncomenda(Encomenda encomenda) {
        return encomendaRepository.save(encomenda);
    }

    public Encomenda updateEstado(EncomendaEstado estado, int id) {
        Encomenda encomenda = encomendaRepository.findById(id);
        encomenda.setEstado(estado);
        encomendaRepository.save(encomenda);

        EncomendaEstadoMongo newState = new EncomendaEstadoMongo();
        newState.setEstado(estado.toString());
        newState.setTimestamp(getDate());
        
        EncomendaMongo encomendaMongo = encomendaMongoRepository.findByEncomenda(id);
        encomendaMongo.getHistory().add(newState);
        encomendaMongoRepository.save(encomendaMongo);
        
        return encomenda;
    }

    public void confirmarEncomenda(int id) {

        //update in rel db
        Encomenda encomenda = encomendaRepository.findById(id);
        encomenda.setEstado(EncomendaEstado.CONFIRMADA);
        encomenda.setConfirmacao(true);
        encomenda.setTimestamp(getDate());
        encomendaRepository.save(encomenda);

        //update in mongo
        EncomendaMongo encomendaMongo = encomendaMongoRepository.findByEncomenda(id);
        EncomendaEstadoMongo newState = new EncomendaEstadoMongo("CONFIRMADA", getDate(), true);
        encomendaMongo.getHistory().add(newState);
        encomendaMongoRepository.save(encomendaMongo);

    }

    public List<Encomenda> getEncomendasByClienteId(int id) {
        return encomendaRepository.findByDestinatarioId(id);
    }

    public List<NotificacaoCliente> getNotificacoesByCliente(int id) {
        return clienteMongoRepo.findByCliente(id).getNotifications();
    }


    /*
     * Historico de encomendas
    */

    public Map<String, Integer> getHistoricoAnual() {
        String currentDate = getDate();
        String year = currentDate.split(" ")[0].split("-")[2];
        
        if (historicoTemporalRepo.findAll().size() > 0 && historicoTemporalRepo.findAll().get(0).getHistory().containsKey(year)) {
            
            Map<String, List<Integer>> histYear = historicoTemporalRepo.findAll().get(0).getHistory().get(year);
            Map<String, Integer> histRes = new LinkedHashMap<>();
            String month = "";
            for (int m=1; m<=12; m++) {
                month += m < 10 ? ("0" + m) : m;
    
                if (histYear.get(month).size() == 0)
                    histRes.put(month, 0);
                else
                    histRes.put(month, histYear.get(month).stream().reduce(0, (a, b) -> a + b));
    
                month = "";
            }
            return histRes;
        }
        return null;
    }
    
    public List<Integer> getHistoricoMensal() {
        String currentDate = getDate();
        String month = currentDate.split(" ")[0].split("-")[1];
        String year = currentDate.split(" ")[0].split("-")[2];

        if (historicoTemporalRepo.findAll().size() > 0 && historicoTemporalRepo.findAll().get(0).getHistory().containsKey(year))
            return historicoTemporalRepo.findAll().get(0).getHistory().get(year).get(month);
        return null;
    }
    
    public Map<String, Integer> getHistoricoSemanal() {
        String currentDate = getDate();
        int day = Integer.parseInt(currentDate.split(" ")[0].split("-")[0]);
        String month = currentDate.split(" ")[0].split("-")[1];
        String year = currentDate.split(" ")[0].split("-")[2];
        Map<String, Integer> history = new LinkedHashMap<>();

        if (historicoTemporalRepo.findAll().size() > 0 && historicoTemporalRepo.findAll().get(0).getHistory().containsKey(year)) {
            
            Map<String, List<Integer>> histYear = historicoTemporalRepo.findAll().get(0).getHistory().get(year);
            String dayStr;
            for (int i=7; i>0; i--) {
                if ((day-i) >= 0) {
                    dayStr = String.format("%02d/%s", day-i+1, month);
                    history.put(dayStr, histYear.get(month).get(day-i));
                }
                else
                    history.put(String.format("%d", day-i+1), 0);
            }
            
            return history;
        }
        return null;
    }



    public String getDate() {
        DateFormat df = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        Date currentDate = Calendar.getInstance().getTime();        
        String currentDateStr = df.format(currentDate);
        return currentDateStr;
    }
    
}
