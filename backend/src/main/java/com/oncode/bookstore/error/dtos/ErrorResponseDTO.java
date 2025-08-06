package com.oncode.bookstore.error.dtos;


import java.util.Date;

import org.springframework.http.HttpStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Schema(description = "DTO for error response")
public class ErrorResponseDTO 
{
    @Schema(description = "error message", example = "400")
    String message;

    @Schema(description = "error description", example = "cannot find resource")
    String error;

    @Schema(description = "error status", example = "BAD_REQUEST")
    HttpStatus status;

    @Schema(description = "error time")
    Date date;
}