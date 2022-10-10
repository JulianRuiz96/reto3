package com.usa.misiontic.demo1.repository.crudRepository;

import com.usa.misiontic.demo1.entities.Score;
import org.springframework.data.repository.CrudRepository;

public interface ScoreCrudRepository  extends CrudRepository<Score, Integer> {
}
