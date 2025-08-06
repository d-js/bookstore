package com.oncode.bookstore.models;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class UserProfile extends Auditable
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_login_id")
    private UserLogin userLogin;

    private String name;

    private String lastname;

    private Integer age;

    @Enumerated(EnumType.STRING)
    private CountryType country;

   //@OneToOne(mappedBy = "user")
   //private ShippingInfo shippingInfo;
}