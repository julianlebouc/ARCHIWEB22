import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from './../../services/api.service';
import * as $ from "jquery";
import { Tokens } from '../../models/Tokens';
import { Track } from '../../models/Track';


@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent{
  recherche = "";

  isConnected=false;
  sParam = "";
  Musiques:any = [];
  urlPlayer:String = "https://open.spotify.com/embed/track/63Ip2RzAZTzdKNxAhFPNxh";

  selectedType: String = ""; //Type de recherche sélectionné
  searchbarPlaceHolderText: string = "un titre";
  accessToken!: String;



  constructor(private apiService: ApiService) {}


  ngOnInit(): void{
    //this.getToken();
  }


  getToken(): void{
    this.apiService.getNewToken()
      .subscribe(tok => {
          console.log("getToken() : token obtenu -> " + tok.token);
          this.accessToken = tok.token;
      });
  }

	/*
	  Fonction appellée lors du clic sur le bouton recherche
	  Utilise le service API pour effectuer la bonne requête selon le choix renseigné
	  Rempli this.Musiques avec le résultat de la requête API
	  param type_recherche : Nombre entre 0, 1 ou 2 correspondant au choix du radio button
	*/
  @HostListener('clickRechercher')
	clickRechercher(value: string): void {

    this.getToken();

    //this.click();
    /*this.accessToken = this.apiService.accessToken;
    console.log("Token dans recherche : " + this.accessToken);
    let search_query = encodeURI('megadose');*/
    // Make Spotify API call
    // Note: We are using the track API endpoint.
    /*$.ajax({
      url: `https://api.spotify.com/v1/search?q=${search_query}&type=track`,
      type: 'GET',
      headers: {
          'Authorization' : 'Bearer ' + this.accessToken
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
          let name = data.tracks.items[count].name;
          let track_number = data.tracks.items[count].track_number;
          console.log("id="+id+ " name:"+name, " tracknumb :" + track_number);
          // Constructing two different iframes to embed the song
          //let src_str = `https://open.spotify.com/embed/track/${id}`;
          //let iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
          //let parent_div = $('#song_'+ count);
          //parent_div.html(iframe);
          count++;
        }
      }
    }); // End of Spotify ajax call*/


    switch(this.selectedType)
    {
      //Regroupement des données par titre
      case "titre":

        break;
      //Regroupement des données par artiste
      case "artiste":

        break;
      //Regroupement des données par album
      case "album":

        break;
    }

	  /*this.apiService.GetMusiques(typeRecherche).subscribe(res => {
	    console.log(res);
	    this.Musiques=res;
	  });*/

    //En attendant de remplir
    let tracks: Track[] = [];
    tracks[0] = new Track("Enter Sandman","Metallica","Blackalbum","uorogjru");
    tracks[1] = new Track("The God That Failed","Metallica","Blackalbum","uorogjru");
    //Envoi des tracks au composant résultat recherche
    this.apiService.envoyerRecherche(tracks);
	}

  //Gére le changement d'état des radio button + met à jour le contenu de la searchbar
  radioChangedHandler(event: any)
  {
    this.selectedType = event.target.value;
    this.searchbarPlaceHolderText = "un " + this.selectedType;
  }
}
