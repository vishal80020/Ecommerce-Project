package com.vishal.ecommerce.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customer")
@Getter
@Setter
public class Customer {
    //@Column is optional

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;


    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL) //mappedBy = "customer" is coming from private Customer customer
    private Set<Order> orders = new HashSet<>();
    // @ManyToOne
    // @JoinColumn(name = "customer_id")
    // private Customer customer;


    public void add(Order order) {
        if(order!=null) {
            if(orders == null) {
                orders = new HashSet<>();
            }
            orders.add(order);
            order.setCustomer(this); //bidirectional mapping
        }
    }

}
