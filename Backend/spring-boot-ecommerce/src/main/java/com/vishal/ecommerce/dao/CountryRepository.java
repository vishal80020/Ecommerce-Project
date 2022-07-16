package com.vishal.ecommerce.dao;

import com.vishal.ecommerce.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "countries", path="countries")
//JpaRepository<Country,Integer> Country is a class and Integer is type of primary Key
public interface CountryRepository extends JpaRepository<Country,Integer> {
}
