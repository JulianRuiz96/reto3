package com.usa.misiontic.demo1.controller;

import com.usa.misiontic.demo1.entities.Category;
import com.usa.misiontic.demo1.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/Category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public List<Category> getAll(){
        return categoryService.getAll();
    }
    @PostMapping("/save")
    public Category save (@RequestBody Category c){
        return categoryService.save(c);
    }


}
