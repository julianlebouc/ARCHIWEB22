import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent{
  recherche = "";
  constructor() { }

  onClick(): void{
  	recherche = querystring.(this.body.searchbar)
  	//envoie à l'API
  }

}
