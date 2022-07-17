import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { LuvToShopFormService } from 'src/app/services/luv-to-shop-form.service';
import { LuvToShopValidators } from 'src/app/validator/luv-to-shop-validators';


@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

	checkoutFormGroup: FormGroup;

	totalPrice: number = 0;
	totalQuantity: number = 0;

	creditCardYears: number[] = [];
	creditCardMonths: number[] = [];

	countries: Country[] = [];
	shippingAddressStates: State[] = [];
	billingAddressStates: State[] = [];

	storage: Storage = sessionStorage;

	constructor(private formBuilder: FormBuilder,
		private luvToShopFormService: LuvToShopFormService,
		private cartService: CartService,
		private checkoutService: CheckoutService,
		private router: Router) { }


	ngOnInit(): void {
		this.reviewCartDetails();
		
		//read the users email address from browsers session storag
		const theEmail = JSON.parse(this.storage.getItem('userEmail'));

		this.checkoutFormGroup = this.formBuilder.group({
			customer: this.formBuilder.group({
				firstName: new FormControl('',
					[Validators.required,
					Validators.minLength(2),
					LuvToShopValidators.notOnlyWhitespace]),
				lastName: new FormControl('',
					[Validators.required,
					Validators.minLength(2),
					LuvToShopValidators.notOnlyWhitespace]),
				email: new FormControl(theEmail,
					[Validators.required,
					Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
			}),

			shippingAddress: this.formBuilder.group({
				street: new FormControl('',
					[Validators.required,
					Validators.minLength(2),
					LuvToShopValidators.notOnlyWhitespace]),
				city: new FormControl('',
					[Validators.required,
					Validators.minLength(2),
					LuvToShopValidators.notOnlyWhitespace]),
				state: new FormControl('',
					[Validators.required]),
				country: new FormControl('',
					[Validators.required]),
				zipCode: new FormControl('',
					[Validators.required,
					Validators.minLength(2),
					LuvToShopValidators.notOnlyWhitespace])
			}),
			billingAddress: this.formBuilder.group({
				street: new FormControl('',
					[Validators.required,
					Validators.minLength(2),
					LuvToShopValidators.notOnlyWhitespace]),
				city: new FormControl('',
					[Validators.required,
					Validators.minLength(2),
					LuvToShopValidators.notOnlyWhitespace]),
				state: new FormControl('',
					[Validators.required]),
				country: new FormControl('',
					[Validators.required]),
				zipCode: new FormControl('',
					[Validators.required,
					Validators.minLength(2),
					LuvToShopValidators.notOnlyWhitespace])
			}),
			creditCard: this.formBuilder.group({
				cardType: new FormControl('',
					[Validators.required]),
				nameOnCard: new FormControl('',
					[Validators.required,
					Validators.minLength(2),
					LuvToShopValidators.notOnlyWhitespace]),
				cardNumber: new FormControl('',
					[Validators.required,
					Validators.pattern('[0-9]{16}')]), //only 16 digit
				securityCode: new FormControl('',
					[Validators.required,
					Validators.pattern('[0-9]{3}')]), //only 3 digit,
				expirationMonth: [''],
				expirationYear: ['']
			})
		});

		//populate credit Card Months
		const startMonth = new Date().getMonth() + 1; // months are zero based
		console.log(`startMonth ${startMonth}`);
		this.luvToShopFormService.getCreditCardMonths(startMonth).subscribe(
			data => {
				console.log(`received credit card months ${JSON.stringify(data)}`);
				this.creditCardMonths = data;
			}
		);

		//populate credit Card Years
		this.luvToShopFormService.getCreditCardYears().subscribe(
			data => {
				console.log(`received credit card years ${JSON.stringify(data)}`);
				this.creditCardYears = data;
			}
		);

		//populate countries 
		this.luvToShopFormService.getCountries().subscribe(
			data => {
				console.log(`received countries ${JSON.stringify(data)}`);
				this.countries = data;
			}
		);


	}

	reviewCartDetails() {
		//subscribe to cartService.totalQuantity
		this.cartService.totalQuantity.subscribe(
			data => {
				this.totalQuantity = data;
			}
		);
		//subscribe to cartService.totalPrice
		this.cartService.totalPrice.subscribe(
			data => {
				this.totalPrice = data;
			}
		);
	}



	//for checking the value in html for validation
	get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
	get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
	get email() { return this.checkoutFormGroup.get('customer.email'); }

	//for checking the value in html for validation
	get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
	get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
	get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
	get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
	get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

	//for checking the value in html for validation
	get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
	get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
	get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
	get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
	get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }

	//for checking the value in html for validation
	get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
	get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
	get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
	get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }



	copyShippingAddressToBillingAddress(event) {
		if (event.target.checked) {
			this.checkoutFormGroup.controls.billingAddress
				.setValue(this.checkoutFormGroup.controls.shippingAddress.value);

			// the state value was not changing because in template we are iterating
			//over billingAddressStates so we need to fix that
			this.billingAddressStates = this.shippingAddressStates;
		} else {
			// suppose some body checked the check box then value will be copied 
			// to billing address and now again they unchecked so we need to reset the form
			this.checkoutFormGroup.controls.billingAddress.reset();

			//reset the billingAddressStates
			this.billingAddressStates = [];
		}
	}


	onSubmit() {
		console.log(`Handling form submission`);
		if (this.checkoutFormGroup.invalid) {
			this.checkoutFormGroup.markAllAsTouched(); // trigger error message for all fields, if any error is there
			return;
		}

		console.log(this.checkoutFormGroup.get('customer').value);
		console.log(`The email address is ${this.checkoutFormGroup.get('customer').value.email}`);

		//set up order
		let order = new Order();
		order.totalQuantity = this.totalQuantity;
		order.totalPrice = this.totalPrice;

		//get cart items
		const cartItems: CartItem[] = this.cartService.cartItems;

		//create orderItems from CartItems
		let orderItems: OrderItem[] = [];
		for (let i = 0; i < cartItems.length; i++) {
			orderItems[i] = new OrderItem(cartItems[i]);
		}

		//set up purchase
		let purchase = new Purchase();

		//populate purchase - customer
		purchase.customer = this.checkoutFormGroup.controls['customer'].value;

		

		//populate purchase - shipping Address
		purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value; //this will give selected value
		console.log(`Shipping state -${purchase.shippingAddress}`);
		console.log(`Shipping state -${purchase.shippingAddress.state}`);
		console.log(`Shipping state with stringify -${JSON.stringify(purchase.shippingAddress.state)}`);
		// JSON.parse(JSON.stringify( )) is for cloning the object.
		// State and country are array objects, we need to get the selected value to pass it to Purchase DTO.
		const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
		const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
		purchase.shippingAddress.state = shippingState.name;
		purchase.shippingAddress.country = shippingCountry.name;

		//populate purchase - billing Address
		purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value; //this will give selected value
		console.log(`Billing state -${purchase.billingAddress}`);
		console.log(`Billing state -${purchase.billingAddress.state}`);
		console.log(`Billing state with stringify -${JSON.stringify(purchase.billingAddress.state)}`);
		const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
		const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
		purchase.billingAddress.state = billingState.name;
		purchase.billingAddress.country = billingCountry.name;

		//populate purchase - Order and OrderItems
		purchase.order = order;
		purchase.orderItems = orderItems;

		//Call REST api via the checkout serivce
		this.checkoutService.placeOrder(purchase).subscribe({
				next: response =>{
					alert(`Order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);
					// reset cart
					this.resetCart();
				},
				error: err => {
					alert(`There was an error: ${err.message}`);
				}
			}
		);
	}

	resetCart() {
		//reset cart data
		this.cartService.cartItems = [];
		this.cartService.totalPrice.next(0);
		this.cartService.totalQuantity.next(0);

		//reset form data
		this.checkoutFormGroup.reset();

		// finally navigate back to products page
		this.router.navigateByUrl("/products");
	}

	handleMonthsAndYears() {
		const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
		const currentYear: number = new Date().getFullYear();
		const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

		//if the currentyear is same as selectedyear then there is no point of expiration month lesser
		//than current month. For eg. currentYear = 2022 and currentMonth = 6 and if
		//selectedYear is 2022 then it is not possible to have a credit expiration like 2nd month and 2022
		//because credit card is already expired

		let startMonth: number;
		if (currentYear === selectedYear) {
			startMonth = new Date().getMonth() + 1; // in javascript it 0 based
		} else {
			startMonth = 1;
		}

		this.luvToShopFormService.getCreditCardMonths(startMonth).subscribe(
			data => {
				console.log(`received credit card months ${JSON.stringify(data)}`);
				this.creditCardMonths = data;
			}
		);

	}

	getStates(formGroupName: string) {
		const formGroup = this.checkoutFormGroup.get(formGroupName);
		const countryCode: string = formGroup.value.country.code;
		const countryName: string = formGroup.value.country.name;
		console.log(`${formGroupName} country code: ${countryCode}`);
		console.log(`${formGroupName} country name: ${countryName}`);

		this.luvToShopFormService.getStates(countryCode).subscribe(
			data => {
				if (formGroupName === 'shippingAddress') {
					this.shippingAddressStates = data;
				} else {
					this.billingAddressStates = data;
				}

				//select first item in state default
				formGroup.get('state').setValue(data[0]);

			}
		);
	}
}
