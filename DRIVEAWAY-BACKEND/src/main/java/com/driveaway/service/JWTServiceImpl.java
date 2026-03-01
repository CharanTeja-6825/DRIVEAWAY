package com.driveaway.service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.driveaway.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTServiceImpl implements JWTService{

	@Value("${jwt.secret}")
	private String secretKey;

	private SecretKey getKey() {
		return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
	}

	
	@Override
	public String generateToken(User user) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("role", user.getRole());
		
		return Jwts.builder() // method to build the JWT token
				   .claims() // specifying that we are adding claims
				   .add(claims) // adds the details regarding user
				   .subject(user.getUserEmail()) // subject specification
				   .issuedAt(new Date(System.currentTimeMillis())) // issued time
				   .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60L))
				   .and()
				   .signWith(getKey()) // signature
				   .compact(); // conversion to String
	}


	@Override
	public String extractEmail(String token) {
		
		return extractClaim(token, Claims::getSubject);
	}

	private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
		final Claims claims = extractAllClaims(token);
		return claimResolver.apply(claims);
	}
	

	private Claims extractAllClaims(String token) {
		return Jwts.parser()
				.verifyWith(getKey())
			    .build()
			    .parseSignedClaims(token)
			    .getPayload();
				 
	}

	@Override
	public boolean validateToken(String token, User user) {
		final String email = extractEmail(token);
		final String role = extractRole(token);
		return (email.equals(user.getUserEmail()) && role.equals(user.getRole()) && !isTokenExpired(token));
	}

	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	@Override
	public String extractRole(String token) {
	    return extractClaim(token, claims -> claims.get("role", String.class));
	}
	
}
