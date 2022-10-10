package com.usa.misiontic.demo1.repository.crudRepository;

import com.usa.misiontic.demo1.entities.Message;
import org.springframework.data.repository.CrudRepository;
public interface MessageCrudRepository extends CrudRepository<Message, Integer> {

}
