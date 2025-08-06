package com.oncode.bookstore.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oncode.bookstore.models.BookStock;


public interface BookStockRepository extends JpaRepository<BookStock, Long>
{

    Optional<BookStock> findByBookId(Long id);
    
}
