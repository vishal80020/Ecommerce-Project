package com.vishal.ecommerce.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "state")
@Data // automatically generates getter and setter
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name="country_id", nullable = false)
    private Country country;



}
