import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-resultat-recherche',
  templateUrl: './resultat-recherche.component.html',
  styleUrls: ['./resultat-recherche.component.css']
})
export class ResultatRechercheComponent implements OnInit {
	Musiques:any = [];
  constructor() { }

  ngOnInit(): void {

  }

  /*
    Recherche dans la base de données les données qui vont être affichées
    Remplit le tableau Musiques_data
  */
  searchInDataBase(){
      Musiques = this.apiService.RetourMusique();
  }
}

