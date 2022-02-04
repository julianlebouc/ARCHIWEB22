import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	REST_API: string = 'http://127.0.0.1:3080/Musiques';
  constructor(private httpClient: HttpClient) { }
  
 GetMusiques(){
	console.log(this.httpClient.get(`${this.REST_API}`));
	return this.httpClient.get(`${this.REST_API}`);
	}
}


