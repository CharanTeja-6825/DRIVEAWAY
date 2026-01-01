package com.driveaway.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;

@Configuration // Turns the plain java file into a configuration file.
@EnableWebSecurity // Intimates SpringBoot to not follow the default flow.
public class SecurityConfig {
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		// perform all the customization over here, lets play with the simple ones.
		
//		http.csrf(customizer -> customizer.disable()); // disables the CSRF 
//		http.authorizeHttpRequests(request -> request.anyRequest().authenticated());
		// permits only authenticated client to access the resource of the server.
		
//		http.formLogin(Customizer.withDefaults()); // enables form access
//		http.httpBasic(Customizer.withDefaults()); // gives access to REST
		
//		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		// Does not maintain a session ID and generates a new ID on every reload.
		
		return http
					.csrf(customizer -> customizer.disable())
					.authorizeHttpRequests(request -> request.anyRequest().permitAll())
//					.formLogin(Customizer.withDefaults())
//					.httpBasic(Customizer.withDefaults())
//					.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
					.build();
		
	}
}
