import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LuvToShopFormService } from 'src/app/services/luv-to-shop-form.service';


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

	constructor(private formBuilder: FormBuilder,
				private luvToShopFormService: LuvToShopFormService ) { }

	ngOnInit(): void {
		this.checkoutFormGroup = this.formBuilder.group({
			customer: this.formBuilder.group({
				firstName: [''],
				lastName: [''],
				email: ['']
			}),
			shippingAddress: this.formBuilder.group({
				street: [''],
				city: [''],
				state: [''],
				country: [''],
				zipCode: ['']
			}),
			billingAddress: this.formBuilder.group({
				street: [''],
				city: [''],
				state: [''],
				country: [''],
				zipCode: ['']
			}),
			creditCard: this.formBuilder.group({
				cardType: [''],
				nameOnCard: [''],
				cardNumber: [''],
				securityCode: [''],
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
		)

	}

	copyShippingAddressToBillingAddress(event) {
		if(event.target.checked) {
			this.checkoutFormGroup.controls.billingAddress
				.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
		} else {
			// suppose some body checked the check box then value will be copied 
			// to billing address and now again they unchecked so we need to reset the form
			this.checkoutFormGroup.controls.billingAddress.reset();
		}
	}

	
	onSubmit() {
		console.log(`Handling form submission`);
		console.log(this.checkoutFormGroup.get('customer').value);
		console.log(`The email address is ${this.checkoutFormGroup.get('customer').value.email}`);
	}

	handleMonthsAndYears() {
		const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
		const currentYear: number = new Date().getFullYear();
		const selectedYear: number = Number (creditCardFormGroup.value.expirationYear);

		//if the currentyear is same as selectedyear then there is no point of expiration month lesser
		//than current month. For eg. currentYear = 2022 and currentMonth = 6 and if
		//selectedYear is 2022 then it is not possible to have a credit expiration like 2nd month and 2022
		//because credit card is already expired
		
		let startMonth: number;
		if(currentYear === selectedYear) {
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
}
