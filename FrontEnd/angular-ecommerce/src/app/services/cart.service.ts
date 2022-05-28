import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
	providedIn: 'root'
})
export class CartService {
	
	cartItems: CartItem[] = [];

	totalPrice: Subject<number> = new Subject<number>();
	totalQuantity: Subject<number> = new Subject<number>();


	constructor() { }

	addToCart(theCartItem: CartItem) {

		// check if we already have item in our cart
		let alreadyExistsInCart: boolean = false;
		let existingCartItem: CartItem = undefined;

		// check if cart is empty or not
		if (this.cartItems.length > 0) {

			// if cart is not empty
			//find whether item currently being added is present in cart already
			// search through all items in cart
			for(let tempCartItem of this.cartItems){
				if(tempCartItem.id === theCartItem.id) {
					//found the item currently being added in the cart is
					//already present 
					existingCartItem = tempCartItem; // here tempCartItem reference is passed to existingCartItem
					alreadyExistsInCart = true;
					break;
				}
			}
		}
		if(alreadyExistsInCart) {
			// we have found that item is already present in cart so no need to add the item itself
			//just increase the quantity of it
			existingCartItem.quantity++;
		} else {
			// add item to the cart
			this.cartItems.push(theCartItem);
		}

		// then compute total price and total quantity
		this.computeCartTotals();
	}
	computeCartTotals() {
		let totalPriceValue: number = 0;
		let totalQuantityValue: number = 0;

		for(let currentCartItem of this.cartItems) {
			totalPriceValue += currentCartItem.unitPrice*currentCartItem.quantity;
			totalQuantityValue += currentCartItem.quantity;
		}

		// publish the new values... all subscribers will receive the new data that's why used subject
		this.totalPrice.next(totalPriceValue); //.next will publish or send the event
		this.totalQuantity.next(totalQuantityValue);

		//log cart data just for debugging purpose
		this.logCartData(totalPriceValue,totalQuantityValue);
	}
	logCartData(totalPriceValue: number, totalQuantityValue: number) {
		console.log(`Contents of the cart: `);
		for(let tempCartItem of this.cartItems){
			const subTotalPrice = tempCartItem.quantity*tempCartItem.unitPrice;
			console.log(`name: ${tempCartItem.name},quantity= ${tempCartItem.quantity},unitPrice= ${tempCartItem.unitPrice},subTotalPrice = ${subTotalPrice}`);
		}
		console.log(`totalPriceValue: ${totalPriceValue.toFixed(2)},quantity: ${totalQuantityValue}`);
		console.log(`******************************`);
	}

	decrementQuantity(theCartItem: CartItem) {
		
		// We are passing data (object) component and service. Since data is being passed as an object, it will "Pass by Reference"
		theCartItem.quantity--;

		if(theCartItem.quantity === 0) {
			this.remove(theCartItem);
		} else {
			this.computeCartTotals();
		}

	}
	remove(theCartItem: CartItem) {
		//get index of the item in an array 
		const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id=== theCartItem.id );

		//if found remove the item from the array
		if(itemIndex > -1) {
			this.cartItems.splice(itemIndex,1);
			this.computeCartTotals();
		}
	}

}
