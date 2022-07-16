package com.vishal.ecommerce.controller;

import com.vishal.ecommerce.dto.Purchase;
import com.vishal.ecommerce.dto.PurchaseResponse;
import com.vishal.ecommerce.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

//    @Autowired // we can avoid writing this annotation because we have only one constructor
    public CheckoutController(CheckoutService theCheckoutService) {
        this.checkoutService = theCheckoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }


}
