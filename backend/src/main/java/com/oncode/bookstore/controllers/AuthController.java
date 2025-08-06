package com.oncode.bookstore.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oncode.bookstore.api.AuthApi;
import com.oncode.bookstore.authentication.dtos.AuthenticationResponseDTO;
import com.oncode.bookstore.authentication.dtos.LoginRequestDTO;
import com.oncode.bookstore.authentication.dtos.RegisterRequestDTO;
import com.oncode.bookstore.authentication.services.AuthenticationService;
import com.oncode.bookstore.validations.CreateRequest;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController implements AuthApi
{
    private final AuthenticationService authService;

    @Override
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) 
    {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(AuthenticationResponseDTO.builder()
                .token(authService.login(loginRequest))
                .build());
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> register(
        @Validated(CreateRequest.class) 
        @RequestBody RegisterRequestDTO registerRequest) 
    {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(AuthenticationResponseDTO.builder()
                .token(authService.register(registerRequest))
                .build());
    }
    
}
