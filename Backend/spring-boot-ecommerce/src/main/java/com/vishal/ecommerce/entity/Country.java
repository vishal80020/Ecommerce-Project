package com.vishal.ecommerce.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="country")
@Getter
@Setter
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="code")
    private String code;

    @Column(name = "name")
    private  String name;

    @OneToMany(mappedBy = "country")
    @JsonIgnore // the state field will be removed from api responses , but If StateRepository interface is created the
    //no need for JsonIgnore because it will be ignored automatically
    private List<State> states;


}
