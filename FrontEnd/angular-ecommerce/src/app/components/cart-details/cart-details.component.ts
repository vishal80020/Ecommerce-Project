import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
	selector: 'app-cart-details',
	templateUrl: './cart-details.component.html',
	styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

	cartItems: CartItem[] = [];
	totalPrice: number = 0;
	totalQuantity: number = 0;

	constructor(private cartServie: CartService) { }

	ngOnInit(): void {
		console.log("Hello Cart ^^^^^^^^^^^^^%%%%%%%%%%%%%%%");
		this.listCartDetails();
	}

	listCartDetails() {
		console.log("Hello Cart ^^^^^^^^^^^^^%%%%%%%%%%%%%%%");
		this.cartItems = this.cartServie.cartItems;

		console.log(`cartItems: ${this.cartItems[0].name}`);

		
		//subscribe to the totalPrice
		this.cartServie.totalPrice.subscribe(
			data=> this.totalPrice = data
		);

		//subscribe to the totalQuantity
		this.cartServie.totalQuantity.subscribe(
			data=> this.totalQuantity = data
		);

		//if route changes then normal Subject will not work
		//meaning the subscibe will not fetch the previous values
		// so we can call computeCartTotals or we can use Behavior Subject

		this.cartServie.computeCartTotals();


	}

}
