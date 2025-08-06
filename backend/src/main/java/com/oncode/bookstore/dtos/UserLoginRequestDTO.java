package com.oncode.bookstore.dtos;

import com.oncode.bookstore.models.RoleType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserLoginRequestDTO
{
    private Long id;
    private String email;
    private RoleType role;
}
