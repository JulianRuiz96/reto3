package com.usa.misiontic.demo1.controller;

import com.usa.misiontic.demo1.entities.Client;
import com.usa.misiontic.demo1.entities.Costume;
import com.usa.misiontic.demo1.service.CostumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/Costume")
public class CostumeController {

    @Autowired
    private CostumeService costumeService;

    @GetMapping("/all")
    @PostMapping("/all")
    public List<Costume> getAll(){
        return costumeService.getAll();
    }


    @PostMapping("/all")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Costume> getAll2(){
        return costumeService.getAll();
    }


    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Costume save (@RequestBody Costume p){
        return costumeService.save(p);
    }

    @PostMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Costume update(@RequestBody Costume costume ){
        return costumeService.update(costume);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return costumeService.delete(id);
    }
}
