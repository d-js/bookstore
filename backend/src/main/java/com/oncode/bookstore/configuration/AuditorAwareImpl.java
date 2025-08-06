package com.oncode.bookstore.configuration;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;


import java.util.Optional;

@Component
public class AuditorAwareImpl implements AuditorAware<String> 
{
    @SuppressWarnings("null")
    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .map(authentication -> authentication.getPrincipal())
                .filter(principal -> principal instanceof UserDetails)
                .map(principal -> (UserDetails) principal)
                .map(UserDetails::getUsername)
                .or(() -> Optional.of("system"));
    }
}
