package com.oncode.bookstore.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Book extends Auditable
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private Integer isbn;
    
    private Double price;

    @Enumerated(EnumType.STRING)
    private GenreType genre;
    

    @Column(name = "title", columnDefinition = "varchar")
    private String title;
    
    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

    private Short rating;
}
