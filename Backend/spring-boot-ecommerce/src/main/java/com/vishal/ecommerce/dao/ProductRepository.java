package com.vishal.ecommerce.dao;

import com.vishal.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

//origin = protocol + hostname + port

@CrossOrigin("http://localhost:4200") //Accept calls from web browser scripts from this origin
public interface ProductRepository extends JpaRepository<Product, Long> {

    //behind the scene
    //select * from product where category_id=?
    //http://localhost:8080/api/product/search/findByCategoryId?=xyz
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
}
