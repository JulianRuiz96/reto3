package com.usa.misiontic.demo1.service;

import com.usa.misiontic.demo1.entities.Category;
import com.usa.misiontic.demo1.entities.Client;
import com.usa.misiontic.demo1.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll(){
        return clientRepository.getAll();
    }

    public Optional<Client> getClient(int id){
        return clientRepository.getClient(id);
    }

    public Client save(Client client){
        if (client.getIdClient()==null){
            return clientRepository.save(client);
        }else {
            Optional<Client> e = clientRepository.getClient(client.getIdClient());
            if (e.isPresent()){
                return client;
            }else{
                return clientRepository.save(client);
            }
        }
    }


    public Client update(Client client){
        if (client.getIdClient()!=null){
            Optional<Client> q = clientRepository.getClient(client.getIdClient());
            if (!q.isEmpty()){
                if (client.getName() !=null) {
                    q.get().setName(client.getName());
                }if (client.getAge()!=null){
                    q.get().setAge(client.getAge());
                }if (client.getPassword()!=null){
                    q.get().setPassword(client.getPassword());
                }
                clientRepository.save(q.get());
                return q.get();
            }else{
                return client;
            }
        }else{
            return client;
        }
    }




//    public boolean delete(int id){
//        boolean flag =false;
//        Optional<Client>p= clientRepository.getClient(id);
//        if (p.isPresent()){
//            clientRepository.delete(p.get());
//            flag=true;
//        }
//        return flag;
//    }

    public boolean deleteClient (int id){
        Boolean d =getClient(id).map(client -> {
            clientRepository.delete(client);
            return true;
        }).orElse(false);
        return d;
    }


//    public Client update(Client p){
//        if (p.getIdClient()!=null){
//            Optional<Client> q = clientRepository.getClient(p.getIdClient());
//            if (q.isPresent()){
//                if (p.getName() !=null) {
//                    q.get().setName(p.getName());
//                }if (p.getEmail()!=null){
//                    q.get().setEmail(p.getEmail());
//                }if (p.getPassword()!=null){
//                    q.get().setPassword(p.getPassword());
//                }if(p.getAge()!=null){
//                    q.get().setAge(p.getAge());
//                }
//                clientRepository.save(q.get());
//                return q.get();
//            }else {
//                return p;
//            }
//        }else{
//            return p;
//        }
//    }


}
