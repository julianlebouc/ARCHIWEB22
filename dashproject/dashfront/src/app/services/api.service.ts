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
  //Attente des évènement dans le composant recherche et transmission vers le composant résultat
  @Output() change: EventEmitter<Track[]> = new EventEmitter();
  envoyerRecherche(tracks: Track[]){
    this.change.emit(tracks);
  }

  SERVER: string = 'http://localhost:3080/Token';

  public accessToken!:string;

  constructor(private httpClient: HttpClient) { }

  //Récupère le Token d'accès stocké sur le serveur EXPRESS
  public getNewToken(): Observable<Tokens>{
    return this.httpClient.get<Tokens>('http://localhost:3080/Token');
  }

}
