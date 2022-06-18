import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
	providedIn: 'root'
})
export class LuvToShopFormService {

	private countriesUrl = `http://localhost:8080/api/countries`;
	private stateUrl = `http://localhost:8080/api/states`;

	constructor(private httpClient: HttpClient) { }

	getCountries(): Observable<Country[]> {
		return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
			map(response => response._embedded.countries)
		);
	}

	getStates(theCountryCode: string): Observable<State[]> {
		//Search State Url
		const searchStateUrl = `${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`;
		return this.httpClient.get<GetResponseStates>(searchStateUrl).pipe(
			map(response => response._embedded.states)
		);
	}

	//returns an observable of array of number
	getCreditCardMonths(startMonth: number): Observable<number[]> {
		let data: number[] = [];
		// buid an array for Month dropdown list

		//if current year is selected then we need to show month from current month to end
		for(let theMonth= startMonth; theMonth<=12; theMonth++) {
			data.push(theMonth);
		}

		return of(data);  //of is used to convert into Observable type
	}

	getCreditCardYears(): Observable<number[]> {
		let data: number[] = [];
		//build an Year for dropdown


		//start at current year and loop for next 10 years
		const startYear: number = new Date().getFullYear();
		const endYear: number = startYear+10;
		for(let theYear = startYear; theYear <= endYear; theYear++ ){
			data.push(theYear);
		}

		return of(data);
	}

	
}

interface GetResponseCountries{
	_embedded: {
		countries: Country[]
	}
}

interface GetResponseStates {
	_embedded: {
		states: State[]
	}
}
