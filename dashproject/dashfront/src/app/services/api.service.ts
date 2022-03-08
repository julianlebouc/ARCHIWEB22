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
  	const { MongoClient, ServerApiVersion } = require('mongodb');
	const uri = "mongodb+srv://Moriceau_Bastien:<81057273>@cluster0.lylgl.mongodb.net/API?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
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
    	
	client.connect(err => {
	 	const collection = client.db("API").collection("Musiques");
	  	collection.insertMany(); //mettre le json modifié
	  	client.close();
	});
	}
	
   RetourMusique(){
   	const { MongoClient, ServerApiVersion } = require('mongodb');
	const uri = "mongodb+srv://Moriceau_Bastien:<81057273>@cluster0.lylgl.mongodb.net/API?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
	client.connect(err => {
  		const collection = client.db("API").collection("Musiques");
  		const findResult = await collection.find();
  		const tableau = findResult.toArray();
  	client.close();
	});
	return tableau;
   }
}


