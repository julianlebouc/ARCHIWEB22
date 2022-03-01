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
