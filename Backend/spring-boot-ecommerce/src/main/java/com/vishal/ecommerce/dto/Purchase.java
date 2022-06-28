package com.vishal.ecommerce.dto;

import com.vishal.ecommerce.entity.Address;
import com.vishal.ecommerce.entity.Customer;
import com.vishal.ecommerce.entity.Order;
import com.vishal.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data //lombok will generate getters and setters method
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
