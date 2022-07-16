package com.vishal.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/* this class is config for RestController,
    we need different config for DataRepository and RestController
 */

@Configuration //used during component scanning
public class MyAppConfig implements WebMvcConfigurer {

    @Value("${allowed.origins}")
    private String[] theAllowedOrigins;

    @Value("${spring.data.rest.base-path}")
    private String basePath;

    @Override
    public void addCorsMappings(CorsRegistry cors) {
        WebMvcConfigurer.super.addCorsMappings(cors);

        //set up cors mapping
        cors.addMapping(basePath + "/**").allowedOrigins(theAllowedOrigins);
    }
}
