package com.oncode.bookstore.api;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.oncode.bookstore.authentication.dtos.AuthenticationResponseDTO;
import com.oncode.bookstore.authentication.dtos.LoginRequestDTO;
import com.oncode.bookstore.authentication.dtos.RegisterRequestDTO;
import com.oncode.bookstore.error.dtos.ErrorResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;


@Tag(name = "Authentication API", description = "Handles login and registration")
public interface AuthApi 
{

    /**
     * Logs in the user using email and password.
     *
     * @param loginRequest The user's credentials.
     * @return A valid JWT and user information.
     */
    @Operation(summary = "Login", description = "Authenticates a registered user")
    @ApiResponses(value = 
    {
        @ApiResponse
        (
            responseCode = "200",
            description = "Success - Login successful",
            content = @Content(mediaType = "application/json", 
            schema = @Schema(implementation = AuthenticationResponseDTO.class))
        ),
        @ApiResponse
        (
            responseCode = "403",
            description = "Invalid credentials",
            content = @Content(mediaType = "application/json", 
            schema = @Schema(implementation = ErrorResponseDTO.class))
        ),
        @ApiResponse
        (
            responseCode = "500",
            description = "Internal server error",
            content = @Content(mediaType = "application/json", 
            schema = @Schema(implementation = ErrorResponseDTO.class))
        )
    })
    ResponseEntity<AuthenticationResponseDTO> login(
        @Parameter(description = "User credentials [email, password]", required = true)
        @RequestBody LoginRequestDTO loginRequest);


    /**
     * Registers a new user.
     *
     * @param registerRequest The data of the user to register.
     * @return A JWT for the newly registered user.
     */
    @Operation(summary = "Registration", description = "Registers a new user in the system")
    @ApiResponses(value = 
    {
        @ApiResponse
        (
            responseCode = "201",
            description = "Success - User registered",
            content = @Content(mediaType = "application/json", 
            schema = @Schema(implementation = AuthenticationResponseDTO.class))
        ),
        @ApiResponse
        (
            responseCode = "500",
            description = "Internal server error",
            content = @Content(mediaType = "application/json", 
            schema = @Schema(implementation = ErrorResponseDTO.class))
        )
    })
    ResponseEntity<AuthenticationResponseDTO> register(
        @Parameter(description = "User data and credentials for registration", required = true)
        @RequestBody RegisterRequestDTO registerRequest); 
}
