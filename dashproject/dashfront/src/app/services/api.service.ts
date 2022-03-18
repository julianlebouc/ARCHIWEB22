import { Injectable, Output, EventEmitter } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as $ from "jquery";
import { Tokens } from '../models/Tokens';
import { Track } from '../models/Track';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  @Output() change: EventEmitter<Track[]> = new EventEmitter();
  envoyerRecherche(tracks: Track[]){
    this.change.emit(tracks);
  }


  SERVER: string = 'http://localhost:3080/Token';
  //Token:any =[];
  //isConnected=false;
  //sParam = "";

  public accessToken!:string;

  constructor(private httpClient: HttpClient) { }

  public initialisation(){
    //this.getNewToken();
  }


  /*
    Récupère un nouveau Token d'accès auprès du serveur
  */
  /*public getNewToken(): void{
    this.httpClient.get('http://localhost:3080/Token').subscribe(res => {
      let tok = res as Tokens;
      console.log("Nouveau tokens : " + tok.token);
      this.accessToken = tok.token;
    });
  }*/

  public getNewToken(): Observable<Tokens>{
    return this.httpClient.get<Tokens>('http://localhost:3080/Token');
  }

  GetMusiques(type_recherche: number){
	let _url: string = "";
    	switch(type_recherche){
      		case 0: //GET BY TRACK

        	break;
      		case 1: //ARTISTE
        _url = 'https://api.spotify.com/v1/artists/id';
        	break;
      		case 2: //ALBUM
        _url = 'https://api.spotify.com/v1/albums/id';
        	break;
    	}
    	//requete

    	//console.log(this.httpClient.get('${_url}'));
    	//return this.httpClient.get('${_url}');
	}




}
