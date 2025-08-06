package com.oncode.bookstore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oncode.bookstore.models.CountryType;
import com.oncode.bookstore.models.UserProfile;


public interface UserProfileRepository extends JpaRepository<UserProfile, Long> 
{

    Optional<UserProfile> deleteAllByUserLoginId(Long id);

    Optional<UserProfile> findByUserLoginId(Long id);

    List<UserProfile> findAllByCountry(CountryType country);
}