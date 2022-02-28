import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  GetMusiques(type_recherche: number){
    let _url: string = "";
    switch(type_recherche)
    {
      case 0: //GET BY TRACK
        _url = './assets/get_track.json'; //Remplacer par l'url spotify : https://api.spotify.com/v1/tracks/id
        break;
      case 1: //ARTISTE
        _url = './assets/get_artiste.json'; //Remplacer par l'url spotify : https://api.spotify.com/v1/artists/id
        break;
      case 2: //ALBUM
        _url = './assets/get_album.json'; //Remplacer par l'url spotify : https://api.spotify.com/v1/albums/id
        break;
    }
  	console.log(this.httpClient.get(`${_url}`));
  	return this.httpClient.get(`${_url}`);
	}
}


