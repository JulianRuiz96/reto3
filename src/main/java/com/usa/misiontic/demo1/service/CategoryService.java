package com.usa.misiontic.demo1.service;

import com.usa.misiontic.demo1.entities.Category;
import com.usa.misiontic.demo1.entities.Client;
import com.usa.misiontic.demo1.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAll(){
        return categoryRepository.getAll();
    }

    public Optional<Category> getCategory(int id){
        return categoryRepository.getCategory(id);
    }

    public Category save(Category p){
        if (p.getId()==null){
            return categoryRepository.save(p);
        }else {
            Optional<Category> e = categoryRepository.getCategory(p.getId());
            if (e.isPresent()){
                return p;
            }else{
                return categoryRepository.save(p);
            }
        }
    }


    public Category update(Category category){
        if (category.getId()!=null){
            Optional<Category> q = categoryRepository.getCategory(category.getId());
            if (q.isPresent()){
                if (category.getName() !=null) {
                    q.get().setName(category.getName());
                }
                categoryRepository.save(q.get());
                return q.get();
            }else {
                return category;
            }
        }else{
            return category;
        }
    }


    public boolean delete(int id){
        boolean flag =false;
        Optional<Category>p= categoryRepository.getCategory(id);
        if (p.isPresent()){
            categoryRepository.delete(p.get());
            flag=true;
        }
        return flag;
    }



}
