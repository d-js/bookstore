package com.oncode.bookstore.authentication.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.oncode.bookstore.models.UserLogin;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService 
{
    private final String SECRET_KEY = "la-mia-chiave-di-sicurezza-segreta";

    public String generateToken(UserLogin user)
    {
        return Jwts.builder()
            .setSubject(user.getEmail())
            .claim("role", user.getRole().name())
            .setIssuedAt(new Date())
            .setExpiration(Date.from(Instant.now().plus(12, ChronoUnit.HOURS)))
            .signWith(getSignKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails)
    {
        return extractSubject(token).equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) 
    {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    public String extractSubject(String token) 
    {
        return extractClaim(token, Claims::getSubject);
    }

    <T> T extractClaim(String token, Function<Claims, T> resolver) 
    {
        return resolver.apply(extractAllClaims(token));
    }

    private Claims extractAllClaims(String token) 
    {
        return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();    
    }

    private Key getSignKey() 
    {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }
    
}
