package com.oncode.bookstore.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oncode.bookstore.models.UserLogin;


public interface UserLoginRepository extends JpaRepository<UserLogin, Long>
{

    Optional<UserLogin> findByEmail(String email);
    
}
