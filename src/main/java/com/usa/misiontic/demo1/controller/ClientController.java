package com.usa.misiontic.demo1.controller;

import com.usa.misiontic.demo1.entities.Category;
import com.usa.misiontic.demo1.entities.Client;
import com.usa.misiontic.demo1.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/Client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/all")
    @PostMapping("/all")
    public List<Client> getAll(){
        return clientService.getAll();
    }


    @PostMapping("/all")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Client> getAll2(){
        return clientService.getAll();
    }
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Client save (@RequestBody Client z){
        return clientService.save(z);
    }

    @PostMapping("update")
    @ResponseStatus(HttpStatus.CREATED)
    public Client update(@RequestBody Client client){
        return clientService.update(client);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return clientService.delete(id);
    }
}
