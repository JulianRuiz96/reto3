package com.usa.misiontic.demo1.repository;

import com.usa.misiontic.demo1.entities.Reservation;
import com.usa.misiontic.demo1.repository.crudRepository.ReservationCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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

    public Reservation save(Reservation p){
        return reservationCrudRepository.save(p);
    }

    public void delete(Reservation p){
        reservationCrudRepository.delete(p);
    }
}
