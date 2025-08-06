package com.oncode.bookstore.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.oncode.bookstore.models.Book;
import com.oncode.bookstore.models.GenreType;



public interface BookRepository extends JpaRepository<Book, Long>
{
    @Query("""
    SELECT b FROM Book b 
            WHERE (:minprice IS NULL OR b.price >= :minprice) 
            AND (:maxprice IS NULL OR b.price <= :maxprice)
            AND (:genre IS NULL OR b.genre = :genre)
            AND ((:contains IS NULL OR :contains = '') OR LOWER(b.title) LIKE LOWER(CONCAT('%', :contains, '%')))
    """)
    List<Book> findAllWithMyParams(@Param("minprice") Double minprice,   
                                    @Param("maxprice") Double maxprice, 
                                    @Param("genre") GenreType genre, 
                                    @Param("contains") String contains);

    List<Book> findByAuthorId(Long id);


    List<Book> findByGenre(GenreType genre);

    List<Book> findByPriceGreaterThanEqual(Double price);

    List<Book> findByTitleContainsIgnoreCase(String contains);

    List<Book> findByAuthorNameIgnoreCase(String authorName);

    void deleteAllByAuthorId(Long id);

}