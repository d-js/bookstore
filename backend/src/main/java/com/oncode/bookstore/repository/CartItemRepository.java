package com.oncode.bookstore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.oncode.bookstore.models.CartItem;


public interface CartItemRepository extends JpaRepository<CartItem, Long>
{
    @Query("""
        SELECT ci.book.id, ci.book.title, SUM(ci.quantity)
        FROM CartItem ci
        WHERE ci.book.id = :bookId
        GROUP BY ci.book.id, ci.book.title
    """)
    Optional<CartItem> findTotalQuantityByBookId(@Param("bookId") Long bookId);

    void deleteByCartIdAndBookId(Long cartId, Long itemId);

    Optional<CartItem> findByBookId(Long bookId);

    Optional<CartItem> findByBookIdAndCartId(Long bookId, Long id);

    List<CartItem> findAllByCartId(Long id);
}
