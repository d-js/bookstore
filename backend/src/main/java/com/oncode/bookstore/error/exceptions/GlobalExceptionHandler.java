package com.oncode.bookstore.error.exceptions;


import java.util.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.oncode.bookstore.error.dtos.ErrorResponseDTO;

import lombok.extern.log4j.Log4j2;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;

@Log4j2
@ControllerAdvice
public class GlobalExceptionHandler 
{
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleAuthorNotFound(EntityNotFoundException e)
    {
        ErrorResponseDTO errorDetails = new ErrorResponseDTO();
        errorDetails.setDate(new Date());
        errorDetails.setError("Entity not found in database");
        errorDetails.setMessage(e.getMessage());
        errorDetails.setStatus(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(ConstraintConflictException.class)
    public ResponseEntity<ErrorResponseDTO> handleConflictException(ConstraintConflictException e)
    {
        ErrorResponseDTO errorDetails = new ErrorResponseDTO();
        errorDetails.setDate(new Date());
        errorDetails.setError("Constraint Conflict in database");
        errorDetails.setMessage(e.getMessage());
        errorDetails.setStatus(HttpStatus.CONFLICT);

        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EntityAlreadyExistException.class)
    public ResponseEntity<ErrorResponseDTO> handleBookAlreadyExist(EntityAlreadyExistException e)
    {
        ErrorResponseDTO errorDetails = new ErrorResponseDTO();
        errorDetails.setDate(new Date());
        errorDetails.setError("Entity already exist in database");
        errorDetails.setMessage(e.getMessage());
        errorDetails.setStatus(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ErrorResponseDTO> handleDatabaseError(DataAccessException e)
    {
        ErrorResponseDTO errorDetails = new ErrorResponseDTO();
        errorDetails.setDate(new Date());
        errorDetails.setError("Database error");
        errorDetails.setMessage(e.getMessage());
        errorDetails.setStatus(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }


    @SuppressWarnings("null")
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleValidationException(MethodArgumentNotValidException e)
    {

        ErrorResponseDTO errorDetails = new ErrorResponseDTO();
        errorDetails.setDate(new Date());
        errorDetails.setError("VALIDATION FAILED");
        errorDetails.setMessage(e.getFieldError().getDefaultMessage());
        errorDetails.setStatus(HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrity(DataIntegrityViolationException ex) 
    {
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(ErrorResponseDTO.builder()
                .message("Constraint conflict in database")
                .error("conflict error")
                .date(new Date())
                .build());
    }

    // fallback
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAll(Exception ex) 
    {
        log.error("Unhandled exception caught", ex);

        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ErrorResponseDTO.builder()
                .message("Internal server error")
                .error("Fallback Error")
                .date(new Date())
                .build());
    }
}
