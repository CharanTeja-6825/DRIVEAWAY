package com.driveaway.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration // Turns the plain java file into a configuration file.
@EnableWebSecurity // Intimates SpringBoot to not follow the default flow.
@EnableMethodSecurity
public class SecurityConfig {
	
	@Autowired
	private JwtFilter jwtFilter;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	
		return http
					.cors(cors -> cors.configurationSource(corsConfigurationSource()))
					.csrf(customizer -> customizer.disable())
					.authorizeHttpRequests(request -> request
															 .requestMatchers("/api/user/login", 
																	 		  "/api/user/register", 
																	 		  "/v3/api-docs/**",
																              "/swagger-ui/**",
																              "/swagger-ui.html")
															 .permitAll()
															 .anyRequest().authenticated())
//					.formLogin(Customizer.withDefaults())
//					.httpBasic(Customizer.withDefaults())
//					.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
					.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
					.build();
		
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
