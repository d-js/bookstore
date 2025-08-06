package com.oncode.bookstore.authentication.dtos;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Login credentials")
public class LoginRequestDTO 
{
    @Schema(description = "Your email", example = "admin@gmail.com")
    private String email;

    @Schema(description = "Your Password", example = "administrator")
    private String password;
}
