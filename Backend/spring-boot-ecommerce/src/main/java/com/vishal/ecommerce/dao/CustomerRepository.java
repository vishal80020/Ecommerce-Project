package com.vishal.ecommerce.dao;

import com.vishal.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

// this is not annotated so will not be exposed
public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Customer findByEmail(String theEmail);
}
