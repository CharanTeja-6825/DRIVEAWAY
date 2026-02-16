package com.driveaway.config;

import java.io.IOException;
import java.util.Collections;

import jakarta.servlet.http.Cookie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import io.jsonwebtoken.JwtException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtFilter extends OncePerRequestFilter{
	
	private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
	
	@Autowired
	private JWTService jwtService;
	
	@Autowired
	ApplicationContext applicationContext;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		System.out.println(request.getServletPath());
		Cookie[] cookies = request.getCookies();
		String authHeader = request.getHeader("Authorization");
		String token = null;
		String email = null;
		String role = null;

		if(cookies != null && cookies.length != 0) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("token")) {
					token = cookie.getValue();
					break;
				}
			}
		}
		if(token != null) {
			try {
				email = jwtService.extractEmail(token);
				role = jwtService.extractRole(token);
			} catch (JwtException | IllegalArgumentException ex) {
				logger.warn("Invalid JWT cookie token: {} - {}", ex.getClass().getSimpleName(), ex.getMessage());
				token = null;
				email = null;
				role = null;
			}
		}
		if(token == null && authHeader != null && authHeader.startsWith("Bearer ")) {
			token = authHeader.substring(7);
			try {
				email = jwtService.extractEmail(token);
				role = jwtService.extractRole(token);
			} catch (JwtException | IllegalArgumentException ex) {
				logger.warn("Invalid JWT authorization token: {} - {}", ex.getClass().getSimpleName(), ex.getMessage());
				token = null;
				email = null;
				role = null;
			}
		}
		
		if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			
			User user = applicationContext.getBean(UserService.class).getUser(email);
			
			if(jwtService.validateToken(token, user)) {
				UsernamePasswordAuthenticationToken authToken = 
						new UsernamePasswordAuthenticationToken(user, null, Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role)));
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}
		
		filterChain.doFilter(request, response);
		
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		String path = request.getServletPath();
		return path.equals("/api/user/login") || path.equals("/api/user/register") || path.equals("/api/user/awake");
	}

}
