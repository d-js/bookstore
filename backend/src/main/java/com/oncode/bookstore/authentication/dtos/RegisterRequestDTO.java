package com.oncode.bookstore.authentication.dtos;


import com.oncode.bookstore.models.CountryType;
import com.oncode.bookstore.models.RoleType;
import com.oncode.bookstore.validations.CreateRequest;
import com.oncode.bookstore.validations.ValidEnum;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO 
{

    @Schema(description = "Your email", example = "admin@gmail.com")
    @Email(message = "Email should be valid")
    @NotBlank(groups = {CreateRequest.class}, message = "Email cannot be blank")
    private String email;

    @Schema(description = "Password of account", example = "administrator")
    @NotEmpty(groups = {CreateRequest.class}, message = "Password cannot be empty")
    @Size(groups = {CreateRequest.class}, min = 8, message = "Password must be at least 8 characters long")
    private String password;

    @Schema(description = "Your age", example = "22")
    @NotNull(groups = {CreateRequest.class}, message = "age cannot be empty")
    @Positive(groups = {CreateRequest.class})
    private Integer age;

    @Schema(description = "Your role", example = "ADMIN")
    @ValidEnum(groups = {CreateRequest.class}, enumClass = RoleType.class, message = "Invalid role type")
    private RoleType role;

    @Schema(description = "Name of profile's owner", example = "pippo")
    @NotBlank(groups = {CreateRequest.class}, message = "Name cannot be blank")
    private String name;

    @NotBlank(groups = {CreateRequest.class}, message = "lastname cannot be blank")
    @Schema(description = "lastname of profile's owner", example = "paoli")
    private String lastname;

    @Schema(description = "City of profile's owner", example = "IT")
    private CountryType country;

}
