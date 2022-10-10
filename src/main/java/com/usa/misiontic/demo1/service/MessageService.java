package com.usa.misiontic.demo1.service;


import com.usa.misiontic.demo1.entities.Message;
import com.usa.misiontic.demo1.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;


    public List<Message> getAll(){
        return messageRepository.getAll();
    }

    public Optional<Message> getProduct(int id){
        return messageRepository.getCostume(id);
    }

    public Message save(Message p){
        if (p.getIdMessage()==null){
            return messageRepository.save(p);
        }else {
            Optional<Message> e = messageRepository.getCostume(p.getIdMessage());
            if (e.isPresent()){
                return p;
            }else{
                return messageRepository.save(p);
            }
        }
    }

//    public Message update(Message p){
//        if (p.getId()!=null){
//            Optional<Message> q = messageRepository.getCostume(p.getId());
//            if (q.isPresent()){
//                if (p.getName() !=null) {
//                    q.get().setName(p.getName());
//                }if (p.getYear()!=null){
//                    q.get().setYear(p.getYear());
//                }if (p.getCategory()!=null){
//                    q.get().setCategory(p.getCategory());
//                }
//                messageRepository.save(q.get());
//                return q.get();
//            }else {
//                return p;
//            }
//        }else{
//            return p;
//        }
//    }
//
//    public boolean delete(int id){
//        boolean flag =false;
//        Optional<Costume>p= costumeRepository.getCostume(id);
//        if (p.isPresent()){
//            costumeRepository.delete(p.get());
//            flag=true;
//        }
//        return flag;
//    }
}
