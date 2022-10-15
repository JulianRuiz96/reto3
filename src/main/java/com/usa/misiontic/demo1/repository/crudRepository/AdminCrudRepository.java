package com.usa.misiontic.demo1.repository.crudRepository;

import com.usa.misiontic.demo1.entities.Admin;
import org.springframework.data.repository.CrudRepository;

public interface AdminCrudRepository extends CrudRepository <Admin, Integer> {
}
