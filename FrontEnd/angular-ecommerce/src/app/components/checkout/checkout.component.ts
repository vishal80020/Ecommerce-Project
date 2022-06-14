import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
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

	constructor(private formBuilder: FormBuilder,
		private luvToShopFormService: LuvToShopFormService) { }

	ngOnInit(): void {
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
				email: new FormControl('',
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

	//for checking the value in html for validation
	get firstName() { return this.checkoutFormGroup.get('customer.firstName');}
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
		}

		console.log(this.checkoutFormGroup.get('customer').value);
		console.log(`The email address is ${this.checkoutFormGroup.get('customer').value.email}`);
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
