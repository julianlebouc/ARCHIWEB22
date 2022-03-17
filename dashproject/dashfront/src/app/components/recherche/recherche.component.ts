import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import * as $ from "jquery";






@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent{
  recherche = "";
  Token:any =[];
  isConnected=false;
  sParam = "";
  Musiques:any = [];
  urlPlayer:String = "https://open.spotify.com/embed/track/63Ip2RzAZTzdKNxAhFPNxh";

  selectedType: string = ""; //Type de recherche sélectionné
  searchbarPlaceHolderText: string = "un titre";


  constructor(private apiService: ApiService) {}

  ngOnInit(): void{
    this.apiService.GetToken().subscribe(res => {
      console.log(res);
      this.Token=res;

      console.log("TOKEN ="+this.Token[0].Token);
      console.log("REFRESHTOKEN ="+this.Token[0].RefreshToken);
      let search_query = encodeURI('megadose');
      // Make Spotify API call
      // Note: We are using the track API endpoint.
      $.ajax({
        url: `https://api.spotify.com/v1/search?q=${search_query}&type=track`,
        type: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + this.Token[0].Token
        },
        success: function(data: any) {
          // Load our songs from Spotify into our page
          let num_of_tracks = data.tracks.items.length;
          let count = 0;
          // Max number of songs is 12
          const max_songs = 12;
          while(count < max_songs && count < num_of_tracks){
            // Extract the id of the FIRST song from the data object
            let id = data.tracks.items[count].id;
            console.log("id="+id)
            // Constructing two different iframes to embed the song
            let src_str = `https://open.spotify.com/embed/track/${id}`;
            let iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
            let parent_div = $('#song_'+ count);
            parent_div.html(iframe);
            count++;
          }
        }
      }); // End of Spotify ajax call
    });
  }

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
}
