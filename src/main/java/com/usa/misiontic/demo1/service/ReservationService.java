package com.usa.misiontic.demo1.service;

import com.usa.misiontic.demo1.entities.Reservation;
import com.usa.misiontic.demo1.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;


    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int id){
        return reservationRepository.getReservation(id);
    }

    public Reservation save(Reservation p) {
        if (p.getIdReservation() == null) {
            return reservationRepository.save(p);
        } else {
            Optional<Reservation> e = reservationRepository.getReservation(p.getIdReservation());
            if (e.isPresent()) {
                return p;
            } else {
                return reservationRepository.save(p);
            }
        }
    }

    public Reservation update(Reservation reservation){
        if (reservation.getIdReservation()!=null){
            Optional<Reservation> e= reservationRepository.getReservation(reservation.getIdReservation());
            if (!e.isEmpty()){

                if (reservation.getStartDate()!=null){
                    e.get().setStartDate(reservation.getStartDate());
                }if (reservation.getDevolutionDate()!=null){
                    e.get().setDevolutionDate(reservation.getDevolutionDate());
                }if (reservation.getStatus() !=null){
                    e.get().setStatus(reservation.getStatus());
                }
                reservationRepository.save(e.get());
                return e.get();
            }else{
                return reservation;
            }

        }else{
            return reservation;
        }
    }

//    public boolean delete(int id){
//        boolean flag =false;
//        Optional<Reservation>p= reservationRepository.getReservation(id);
//        if (p.isPresent()){
//            reservationRepository.delete(p.get());
//            flag=true;
//        }
//        return flag;
//    }

    public boolean deleteReservation(int id){
        Boolean d = getReservation(id).map(reservation -> {
            reservationRepository.delete(reservation);
            return true;
        }).orElse(false);
        return d;
    }


}
