package com.oncode.bookstore.authentication.jwt;


import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.oncode.bookstore.authentication.services.StoreUserProfileService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter
{

    private final JwtService jwtService;
    private final StoreUserProfileService userProfileService;


    @Override
    @SuppressWarnings("null")
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                chain.doFilter(request, response);
                return;
            }

            String jwt = authHeader.substring(7);
            String email = jwtService.extractSubject(jwt);

            if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) 
            {
                UserDetails userDetails = userProfileService.loadUserByUsername(email);
                
                
                if (jwtService.isTokenValid(jwt, userDetails))
                {
                    String role = jwtService.extractClaim(jwt, claims -> claims.get("role", String.class));
                    List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            authorities);

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                } 
                else 
                {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }
            }

            chain.doFilter(request, response);

        } 
        catch (Exception e) 
        {
            throw e;
        }
    }

}
