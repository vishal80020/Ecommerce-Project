package com.vishal.ecommerce.dao;

import com.vishal.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

//origin = protocol + hostname + port

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {

    //behind the scene
    //select * from product where category_id=?
    //http://localhost:8080/api/products/search/findByCategoryId?id=1
    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

    //select * from product p where p.name like concat('%', :name, '%');
    //http://localhost:8080/api/products/search/findByNameContaining?name=Python
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
