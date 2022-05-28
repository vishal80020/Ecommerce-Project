import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

	checkoutFormGroup: FormGroup;

	totalPrice: Number = 0;
	totalQuantity: Number = 0;

	constructor(private formBuilder: FormBuilder) { }

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
}
