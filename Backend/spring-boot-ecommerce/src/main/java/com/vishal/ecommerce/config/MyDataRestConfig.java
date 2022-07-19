package com.vishal.ecommerce.config;

import com.vishal.ecommerce.entity.*;

import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Value("${allowed.origins}") //this is coming from application.properties file
    private  String[] theAllowedOrigins;

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,HttpMethod.PUT,
                HttpMethod.DELETE, HttpMethod.PATCH
        };
        //disable http method for Product: POST, PUT, DELETE, PATCH
        disableHttpMethods(Product.class,config, theUnsupportedActions);

        //disable http method for ProductCategory: POST, PUT, DELETE, PATCH
        disableHttpMethods(ProductCategory.class,config, theUnsupportedActions);

        //disable http method for Country: POST, PUT, DELETE, PATCH
        disableHttpMethods(Country.class,config, theUnsupportedActions);

        //disable http method for State: POST, PUT, DELETE, PATCH
        disableHttpMethods(State.class,config, theUnsupportedActions);

        //disable http method for Order: POST, PUT, DELETE, PATCH
        disableHttpMethods(Order.class,config, theUnsupportedActions);

        //call an internal helper method to expose entity ids
        exposeIds(config);

        //config cors mapping
//        cors.addMapping("/api/**").allowedOrigins("http://localhost:4200");
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(theAllowedOrigins);

    }

    private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        //expose entity ids
        //

        //get the list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        //create an arraylist of entity type
        List<Class> entityClasses = new ArrayList<>();

        //get the entity type for the entities
        for(EntityType tempEntityType: entities){
            entityClasses.add(tempEntityType.getJavaType());
        }

        //expose the entity ids for the array of entity types/domain types
        /*
         * The use of Class[0] tells the method to create
         * an array of type Class object. Mainly for "typing".
         * The reason will use 0 is for efficiency reasons.
         * More information is here:
         * https://stackoverflow.com/a/4042464
         * */
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }
}
