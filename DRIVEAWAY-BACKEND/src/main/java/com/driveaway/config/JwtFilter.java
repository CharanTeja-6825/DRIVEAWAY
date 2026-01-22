package com.driveaway.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.driveaway.entity.User;
import com.driveaway.service.JWTService;
import com.driveaway.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtFilter extends OncePerRequestFilter{
	
	@Autowired
	private JWTService jwtService;
	
	@Autowired
	ApplicationContext applicationContext;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader = Arrays.stream(request.getCookies()).filter(cookie -> "JWT_TOKEN".equals(cookie.getName()))
				.map(Cookie::getValue)
				.findFirst()
				.orElse(null);
		System.out.println(authHeader);
		String token = null;
		String email = null;
		
		if(authHeader != null) {
			token = authHeader;
			email = jwtService.extractEmail(token);
		}
		
		if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			
			User user = applicationContext.getBean(UserService.class).getUser(email);
			
			if(jwtService.validateToken(token, user)) {
				UsernamePasswordAuthenticationToken authToken = 
						new UsernamePasswordAuthenticationToken(user, null, Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole())));
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}
		
		filterChain.doFilter(request, response);
		
	}

}
