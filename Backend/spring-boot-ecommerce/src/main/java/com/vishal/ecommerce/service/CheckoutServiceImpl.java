package com.vishal.ecommerce.service;

import com.vishal.ecommerce.dao.CustomerRepository;
import com.vishal.ecommerce.dto.Purchase;
import com.vishal.ecommerce.dto.PurchaseResponse;
import com.vishal.ecommerce.entity.Customer;
import com.vishal.ecommerce.entity.Order;
import com.vishal.ecommerce.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service // spring will pick it up during component scanning
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

//    @Autowired
    public  CheckoutServiceImpl(CustomerRepository theCustomerRepository) {
        this.customerRepository = theCustomerRepository;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        // retrieve the order info from dto - Purchase class
        Order order = purchase.getOrder();

        //generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        //populate Order with OrderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(items -> order.add(items));  // order has so many oder Items so we need to add them

        //populate Order with billingAddress and ShippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        //populate Customer with Order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        //save to the database
        customerRepository.save(customer); // Spring JPA generates the implementing class code for you. that's able to
        //create the object and call the save method though customerRepository is an interface

        //return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        //generate a random UUID number - (UUID version-4) UUID - Universally Unique Identifier
        return UUID.randomUUID().toString();
    }
}
