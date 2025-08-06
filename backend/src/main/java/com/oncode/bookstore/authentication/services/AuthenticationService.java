package com.oncode.bookstore.authentication.services;


import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.oncode.bookstore.authentication.dtos.LoginRequestDTO;
import com.oncode.bookstore.authentication.dtos.RegisterRequestDTO;
import com.oncode.bookstore.dtos.UserLoginRequestDTO;
import com.oncode.bookstore.mapping.RegisterMapper;
import com.oncode.bookstore.models.Cart;
import com.oncode.bookstore.models.UserLogin;
import com.oncode.bookstore.models.UserProfile;
import com.oncode.bookstore.repository.CartRepository;
import com.oncode.bookstore.repository.UserLoginRepository;
import com.oncode.bookstore.repository.UserProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService 
{
    private final RegisterMapper registerMapper;

    private final com.oncode.bookstore.authentication.jwt.JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final UserLoginRepository userRepository;
    private final UserProfileRepository profileInfoRepository;
    private final CartRepository cartRepository;


    public String login(LoginRequestDTO loginRequest) 
    {
        UserLogin userLogin = userRepository
                                .findByEmail(loginRequest.getEmail())
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), userLogin.getHashedPassword())) 
        {
            throw new IllegalArgumentException("Invalid credentials");
        }
        return jwtService.generateToken(userLogin);
    }

    public String register(RegisterRequestDTO registerRequest) 
    {
        checkEmailAlreadyInUse(registerRequest.getEmail());
        
        UserLogin userLogin = createUserLogin(registerRequest);
        
        UserProfile userProfile = createUserProfile(registerRequest, userLogin);

        createUserCart(userProfile);
        
        return jwtService.generateToken(userLogin);
    }
    
    
    private void checkEmailAlreadyInUse(String email) 
    {
        if (userRepository.findByEmail(email).isPresent()) 
        {
            throw new IllegalArgumentException("Email already in use");
        }
    }
    

    private UserLogin createUserLogin(RegisterRequestDTO registerRequest) 
    {
        UserLogin userLogin = registerMapper.toLoginEntity(registerRequest);
        userLogin.setHashedPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(userLogin);

        return userLogin;
    }
    
    private UserProfile createUserProfile(RegisterRequestDTO registerRequest, UserLogin userLogin) 
    {
        UserProfile userProfile = registerMapper.toProfileEntity(registerRequest);
        userProfile.setUserLogin(userLogin);
        profileInfoRepository.save(userProfile);

        return userProfile;
    }

    private Cart createUserCart(UserProfile userProfile) 
    {
        Cart userCart = Cart.builder().user(userProfile).build();
        cartRepository.save(userCart);

        return userCart;
    }

    public UserLoginRequestDTO getLoggedInUser(String token) 
    {
        String email = jwtService.extractSubject(token);
        return userRepository.findByEmail(email)
            .map(user -> registerMapper.toLoginDTO(user))
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
    
}
