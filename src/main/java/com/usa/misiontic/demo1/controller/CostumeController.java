package com.usa.misiontic.demo1.controller;

import com.usa.misiontic.demo1.entities.Costume;
import com.usa.misiontic.demo1.service.CostumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/Costume")
public class CostumeController {

    @Autowired
    private CostumeService costumeService;

    @GetMapping("/all")
    public List<Costume> getAll(){
        return costumeService.getAll();
    }
    @PostMapping("/save")
    public Costume save (@RequestBody Costume p){
        return costumeService.save(p);
    }


}
