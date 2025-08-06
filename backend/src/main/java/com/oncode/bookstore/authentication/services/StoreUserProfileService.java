package com.oncode.bookstore.authentication.services;


import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.oncode.bookstore.models.UserLogin;
import com.oncode.bookstore.repository.UserLoginRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class StoreUserProfileService implements UserDetailsService
{

    private final UserLoginRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException 
    {
        UserLogin user = userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getHashedPassword(),
            List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())));
    }
    
}
