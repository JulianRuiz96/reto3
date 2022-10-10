package com.usa.misiontic.demo1.controller;

import com.usa.misiontic.demo1.entities.Client;
import com.usa.misiontic.demo1.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/Client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/all")
    public List<Client> getAll(){
        return clientService.getAll();
    }
    @PostMapping("/save")
    public Client save (@RequestBody Client z){
        return clientService.save(z);
    }
}
