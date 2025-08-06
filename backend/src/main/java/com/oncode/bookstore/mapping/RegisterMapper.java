package com.oncode.bookstore.mapping;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.oncode.bookstore.authentication.dtos.RegisterRequestDTO;
import com.oncode.bookstore.dtos.UserLoginRequestDTO;
import com.oncode.bookstore.models.UserLogin;
import com.oncode.bookstore.models.UserProfile;



@Mapper(componentModel = "spring")
public interface RegisterMapper 
{
    // TODO warn
    
    @Mapping(source = "password", target = "hashedPassword")
    @Mapping(target = "id", ignore = true)
    UserLogin toLoginEntity(RegisterRequestDTO entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userLogin", ignore = true)
    UserProfile toProfileEntity(RegisterRequestDTO entity);

    UserLoginRequestDTO toLoginDTO(UserLogin entity);
    
}
