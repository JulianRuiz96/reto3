package com.usa.misiontic.demo1.controller;

import com.usa.misiontic.demo1.entities.Reservation;
import com.usa.misiontic.demo1.personalized.CountClient;
import com.usa.misiontic.demo1.personalized.StatusAmount;
import com.usa.misiontic.demo1.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("api/Reservation")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all")
    @PostMapping("/all")
    public List<Reservation> getAll(){
        return reservationService.getAll();
    }

    @PostMapping("/all")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Reservation> getAll2(){
        return reservationService.getAll();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation save (@RequestBody Reservation reservation){
        return reservationService.save(reservation);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation reservation ){
        return reservationService.update(reservation);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return reservationService.deleteReservation( id);
    }

    @GetMapping("/report-clients")
    public List<CountClient>getReservationReportClient(){
        return reservationService.getTopClients();
    }

    @GetMapping("/report-status")
    public StatusAmount getReservationStatus(){
        return reservationService.getReservationStatusReport();
    }

    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
        public List<Reservation>getReservationReportDates(@PathVariable("dateOne") String dateOne, @PathVariable("dateTwo")String dateTwo){
        return reservationService.getReservationPeriod(dateOne, dateTwo);
    }
}
