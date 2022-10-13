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

    public Optional<Message> getMessage(int id){
        return messageRepository.getMessage(id);
    }

    public Message save(Message p){
        if (p.getIdMessage()==null){
            return messageRepository.save(p);
        }else {
            Optional<Message> e = messageRepository.getMessage(p.getIdMessage());
            if (e.isPresent()){
                return p;
            }else{
                return messageRepository.save(p);
            }
        }
    }

    public Message update(Message message) {
        if (message.getIdMessage() != null) {
            Optional<Message> q = messageRepository.getMessage(message.getIdMessage());
            if (!q.isEmpty()) {
                if (message.getMessageText() != null) {
                    q.get().setMessageText(message.getMessageText());
                }
                messageRepository.save(q.get());
                return q.get();
            } else {
                return message;
            }
        } else {
            return message;
        }
    }

//    public boolean delete(int id){
//        boolean flag =false;
//        Optional<Message>p= messageRepository.getCostume(id);
//        if (p.isPresent()){
//            messageRepository.delete(p.get());
//            flag=true;
//        }
//        return flag;
//    }

    public boolean deleteMessage (int id){
        Boolean d = getMessage(id).map(message -> {
            messageRepository.delete(message);
            return true;
        }).orElse(false);
        return d;
    }




}
