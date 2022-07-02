package com.vishal.ecommerce.dto;

import lombok.Data;

@Data //lombok will generate constructor only for final fields
public class PurchaseResponse {
    //use this class to send java object as JSON

    private final String orderTrackingNumber;

}
