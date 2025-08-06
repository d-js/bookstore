package com.oncode.bookstore.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.oncode.bookstore.models.Author;


public interface AuthorRepository extends JpaRepository<Author, Long>
{

}
