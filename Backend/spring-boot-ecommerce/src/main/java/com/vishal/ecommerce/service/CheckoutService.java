package com.vishal.ecommerce.service;

import com.vishal.ecommerce.dto.Purchase;
import com.vishal.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
