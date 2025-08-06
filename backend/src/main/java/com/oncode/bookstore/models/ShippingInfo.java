package com.oncode.bookstore.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@EqualsAndHashCode(callSuper = false)
public class ShippingInfo extends Auditable
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String lastname;

    private String address;

    private Integer cap;

    private Long tnumber;

    @OneToOne
    @JoinColumn(name = "user_profile_id")
    private UserProfile userProfile;
}
