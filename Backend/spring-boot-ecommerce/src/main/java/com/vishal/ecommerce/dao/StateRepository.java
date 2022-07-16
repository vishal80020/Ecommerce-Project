package com.vishal.ecommerce.dao;

import com.vishal.ecommerce.entity.State;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer> {


//    As i read we need to use @Param when we do query methods and
//    we need to use @RequestParam when we need to get something from the url and work with it ourselfs in our methods


//   When working with Spring Data REST we should actually use @Param instead of @RequestParam.
//   The @RequestParam will work in certain cases ... but the best solution is to use @Param.

    List<State> findByCountryCode(@Param("code") String code); // we don't paginated data we need entire data so not used Pageable here

}
