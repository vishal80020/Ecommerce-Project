import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

	constructor(private oktaAuth: OktaAuth) { }
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return from(this.handleAccess(request, next));
	}

	private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {

		//only add an access token for secured endpoints
		const theEndPoint = environment.luvToShopApiUrl+'/orders';
		const securedEndPoints = [theEndPoint];
		if (securedEndPoints.some(url => request.urlWithParams.includes(url))) {
			//get access token
			const accessToken = await this.oktaAuth.getAccessToken();

			//clone the request and add new header with access token
			//clone is required because request is immutable and we can't change
			request = request.clone({
				setHeaders: {
					Authorization: 'Bearer ' + accessToken
				}
			});
		}
		return next.handle(request).toPromise();
	}
}
