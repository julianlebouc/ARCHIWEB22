import { Component, OnInit } from '@angular/core';

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
  constructor() {}

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
		
}
