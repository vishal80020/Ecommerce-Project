package com.vishal.ecommerce.dao;

import com.vishal.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

//origin = protocol + hostname + port

@CrossOrigin("http://localhost:4200") //Accept calls from web browser scripts from this origin
public interface ProductRepository extends JpaRepository<Product, Long> {
}
