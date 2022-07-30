import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
	providedIn: 'root'
})
export class ProductService {


	private baseUrl = environment.luvToShopApiUrl + '/products';
	private categoryUrl = environment.luvToShopApiUrl + '/product-category';

	constructor(private httpClient: HttpClient) { }

	getProduct(theProductId: number): Observable<Product> {
		//need to build the url based on product id
		const productUrl = `${this.baseUrl}/${theProductId}`;
		// "http://localhost:8080/api/products/1"
		return this.httpClient.get<Product>(productUrl);
	}

	getProductListPaginate(thePage: number,
		thePageSize: number,
		theCategoryId: number): Observable<GetResponseProducts> {
		// need to build URL based on category id, page and size 
		const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
			+ `&page=${thePage}&size=${thePageSize}`;

		return this.httpClient.get<GetResponseProducts>(searchUrl);
	}

	getProductList(theCategoryId: number): Observable<Product[]> {
		// need to build URL based on category id
		const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

		return this.getProducts(searchUrl);
	}

	searchProducts(theKeyword: string): Observable<Product[]> {
		// need to build URL based on the keyword
		const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
		console.log(`url= ${searchUrl}`);
		return this.getProducts(searchUrl);
	}

	searchProductsPaginate(thePage: number,
		thePageSize: number,
		theKeyword: string): Observable<GetResponseProducts> {
		// need to build URL based on keyword, page and size 
		const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
			+ `&page=${thePage}&size=${thePageSize}`;

		return this.httpClient.get<GetResponseProducts>(searchUrl);
	}

	private getProducts(searchUrl: string): Observable<Product[]> {
		return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
			map(response => response._embedded.products)
		);
	}

	getProductCategories(): Observable<ProductCategory[]> {

		return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
			map(response => response._embedded.productCategory)
		);
	}
}

//added page key to leverage pagination support given by spring as meta data
interface GetResponseProducts {
	_embedded: {
		products: Product[]
	},
	page: {
		size: number, //batch size
		totalElements: number, // total enteries present
		totalPages: number,  //total number of page(totalElements/size)
		number: number  // current page number
	}
}

interface GetResponseProductCategory {
	_embedded: {
		productCategory: ProductCategory[]
	}
}