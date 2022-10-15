package com.usa.misiontic.demo1.repository;

import com.usa.misiontic.demo1.entities.Client;
import com.usa.misiontic.demo1.entities.Reservation;
import com.usa.misiontic.demo1.personalized.CountClient;
import com.usa.misiontic.demo1.repository.crudRepository.ReservationCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class ReservationRepository {

    @Autowired
    private ReservationCrudRepository reservationCrudRepository;

    public List<Reservation> getAll(){
        return (List<Reservation>) reservationCrudRepository.findAll();
    }

    public Optional<Reservation> getReservation(int id){
        return reservationCrudRepository.findById(id);
    }

    public Reservation save(Reservation reservation){
        return reservationCrudRepository.save(reservation);
    }

    public void delete(Reservation reservation){
        reservationCrudRepository.delete(reservation);
    }

    public List<CountClient> getTopClients(){
        List<CountClient> result = new ArrayList<>();
        List<Object[]> report = reservationCrudRepository.countTotalReservationsByClient();
        for (int i=0; i< report.size();i++){
            result.add(new CountClient((Long) report.get(i)[1], (Client)report.get(i)[0]));
        }
        return result;
    }

    public List<Reservation> getReservationPeriod (Date a, Date b){
        return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(a, b);
    }

    public  List<Reservation> getReservationByStatus(String status){
        return reservationCrudRepository.findAllByStatus(status);
    }
}
