package com.oncode.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oncode.bookstore.models.ShippingInfo;

public interface ShippingInfoRepository extends JpaRepository<ShippingInfo, Long> 
{
    
}
