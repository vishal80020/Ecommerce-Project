package com.vishal.ecommerce.dao;

import com.vishal.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
/*name of json = productCategory and path="/product-category"
Generally JPA makes plural of the class name that we pass in <JpaRepository<ProductCategory,Long>
but here it won't make as ProductCategories rather it will do as ProductCategorys so kind of confusing
so used @RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
when we hit localhost:8080/api will be able to understand more
*/


//origin = protocol + hostname + port

@CrossOrigin("http://localhost:4200") //Accept calls from web browser scripts from this origin
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
}
