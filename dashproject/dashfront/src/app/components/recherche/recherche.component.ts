import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent{
  recherche = "";
  token ="";
  isConnected=false;
  sParam = "";
  Musiques:any = [];

  constructor(private apiService: ApiService) {}

 loginSpotify(): void{
  	const getUrlParameter =(sParam: any) => {
  		let sPageURL = window.location.search.substring(1),
  		sURLVariables = sPageURL != undefined && sPageURL.length >0 ?
  		sPageURL.split(`#`) : [],
  		sParameterName,
  		i;
  		let split_str = window.location.href.length > 0 ?
  		window.location.href.split(`#`) : [];
  		sURLVariables = split_str != undefined && split_str.length >1 && split_str[1].length > 0 ? split_str[1].split(`&`) : [];
  		for(i=0; i< sURLVariables.length; i++){
  			sParameterName = sURLVariables[i].split(`=`);
			console.log("sParameterName : " +sParameterName[0] + " sParam : "+sParam);
  			if(sParameterName[0]===sParam){
  				return sParameterName[1]===undefined ? true :
  				decodeURIComponent(sParameterName[1]);
  			} 
		}
		return false;
	};
	const accessToken = getUrlParameter(`access_token`);
	let client_id = `d119537df82148ad80691b7349e6e31b`;
	let redirect_uri = `http://localhost:4200/callback/`;
	const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`; 
	if(accessToken ==null || accessToken=="" || accessToken==undefined){
		//window.location.replace(redirect);
	}
	this.token=accessToken.toString();
	this.isConnected =true;
	console.log("Le token d'access est : " + this.token);
	}

	/*
	  Fonction appellée lors du clic sur le bouton recherche
	  Utilise le service API pour effectuer la bonne requête selon le choix renseigné
	  Rempli this.Musiques avec le résultat de la requête API
	  param type_recherche : Nombre entre 0, 1 ou 2 correspondant au choix du radio button
	*/
	clickRechercher(type_recherche: number): void {
	  this.apiService.GetMusiques(type_recherche).subscribe(res => {
	    console.log(res);
	    this.Musiques=res;
	  });
	}

	/*
	  Récupère la valeur de this.Musiques et rempli la base de donnée
	*/
	fillDataBase(): void{
	  //A FAIRE
	}
		
}
