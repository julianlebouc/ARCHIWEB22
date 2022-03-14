import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  REST_API: string = 'http://127.0.0.1:3080/Token';
  

  constructor(private httpClient: HttpClient) { }

  GetToken(){
    console.log(this.httpClient.get(`${this.REST_API}`));
  	return this.httpClient.get(`${this.REST_API}`);
  }

  GetMusiques(type_recherche: number){
	let _url: string = "";
    	switch(type_recherche){
      		case 0: //GET BY TRACK
        _url = 'https://api.spotify.com/v1/tracks/id';
        	break;
      		case 1: //ARTISTE
        _url = 'https://api.spotify.com/v1/artists/id';
        	break;
      		case 2: //ALBUM
        _url = 'https://api.spotify.com/v1/albums/id';
        	break;
    	}
    	//requete
    	console.log(this.httpClient.get('${_url}'));
    	return this.httpClient.get('${_url}');
	}
	
}


