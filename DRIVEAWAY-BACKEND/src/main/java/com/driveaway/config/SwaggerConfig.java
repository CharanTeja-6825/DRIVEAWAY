package com.driveaway.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    OpenAPI taskOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Budget Planner")
                        .description("Spring Boot REST API for managing Expenses and Savings Goals")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Developer Team")
                                .email("demo@example.com")
                                .url("https://github.com/CharanTeja-6825/GIT-ACTIONS-DOCKER-SDP-DEVOPS"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://springdoc.org")));
    }
}