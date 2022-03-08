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

  selectedType: string = ""; //Type de recherche sélectionné
  searchbarPlaceHolderText: string = "un titre";


  constructor(private apiService: ApiService) {}

	/*
	  Fonction appellée lors du clic sur le bouton recherche
	  Utilise le service API pour effectuer la bonne requête selon le choix renseigné
	  Rempli this.Musiques avec le résultat de la requête API
	  param type_recherche : Nombre entre 0, 1 ou 2 correspondant au choix du radio button
	*/
	clickRechercher(): void {
    let typeRecherche: number = 0;
    switch(this.selectedType)
    {
      case "titre":
        typeRecherche = 0;
        break;
      case "artiste":
        typeRecherche = 1;
        break;
      case "album":
        typeRecherche = 2;
        break;
    }

	  this.apiService.GetMusiques(typeRecherche).subscribe(res => {
	    console.log(res);
	    this.Musiques=res;
	  });
	}

  //Gére le changement d'état des radio button + met à jour le contenu de la searchbar
  radioChangedHandler(event: any)
  {
    this.selectedType = event.target.value;
    this.searchbarPlaceHolderText = "un " + this.selectedType;
  }



	/*
	  Récupère la valeur de this.Musiques et rempli la base de donnée
	*/
	fillDataBase(): void{
	  //A FAIRE
	}

}

