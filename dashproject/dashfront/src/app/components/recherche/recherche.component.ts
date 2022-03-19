import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from './../../services/api.service';
import * as $ from "jquery";
import { Tokens } from '../../models/Tokens';
import { Track } from '../../models/Track';
import { Subject, Observable } from 'rxjs';


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

  selectedType: String = "titre"; //Type de recherche sélectionné
  searchbarPlaceHolderText: string = "un titre";
  accessToken!: String;

  constructor(protected apiService: ApiService) {}
  ngOnInit(): void{}

  /*
    getToken() méthode pour récupérer un token d'accès
  */
  getToken(): Observable<string>{
    var subject = new Subject<string>();
    this.apiService.getNewToken()
      .subscribe(tok => {
          console.log("getToken() : token obtenu -> " + tok.token);
          subject.next(tok.token);
      });
    return subject.asObservable();
  }

	/*
	  Fonction appellée lors du clic sur le bouton recherche
	  Utilise le service API pour effectuer la bonne requête selon le choix renseigné
	  Rempli this.Musiques avec le résultat de la requête API
	  param type_recherche : Nombre entre 0, 1 ou 2 correspondant au choix du radio button
	*/
  @HostListener('clickRechercher')
	clickRechercher(value: string): void {
    this.getToken()
      .subscribe( token => {

        //Recherche en fonction du critère selectionné
        switch(this.selectedType)
        {
          //Regroupement des données par titre
          case "titre": {
              let tracks: Track[] = [];
              // Make Spotify API call
              // Note: We are using the track API endpoint.
              let search_query = encodeURI(value);
              console.log("Recherche de " + search_query + " type sélectiooné : "+ this.selectedType +" avec token " + token);
              $.ajax({
                url: `https://api.spotify.com/v1/search?q=${search_query}&type=track`,
                type: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + token
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
                    let track_name = data.tracks.items[count].name;
                    let track_number = data.tracks.items[count].track_number;
                    let album_name = data.tracks.items[count].album.name;
                    let artist_name = data.tracks.items[count].artists[0].name;
                    console.log("id="+id+ "artist : " + artist_name + " name:"+track_name, " tracknumb :" + track_number + " album : " + album_name);
                    // Constructing two different iframes to embed the song
                    //let src_str = `https://open.spotify.com/embed/track/${id}`;
                    //let iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
                    //let parent_div = $('#song_'+ count);
                    //parent_div.html(iframe);

                    //Ajout d'une track dans le tableau
                    tracks[count] = new Track(track_name, artist_name,album_name,id);
                    count++;
                  }
                  //Envoi des tracks au composant résultat recherche

                }
              }); // End of Spotify ajax call
              this.apiService.envoyerRecherche(tracks);
            }
            break;
          //Regroupement des données par artiste
          case "artiste": {
            let tracks: Track[] = [];
            // Make Spotify API call
            // Note: We are using the track API endpoint.
            let search_query = encodeURI(value);
            console.log("Recherche de " + search_query + " type sélectiooné : "+ this.selectedType +" avec token " + token);
            $.ajax({
              url: `https://api.spotify.com/v1/search?q=${search_query}&type=artist`,
              type: 'GET',
              headers: {
                  'Authorization' : 'Bearer ' + token
              },
              success: function(data: any) {

                // Load our songs from Spotify into our page
                let artist_id = data.artists.items[0].id;
                let artist_name = data.artists.items[0].name;
                console.log("name : " + artist_name + "id: " + artist_id);

                let id_artiste = encodeURI(artist_id);
                console.log("Recherche de " + id_artiste +" avec token " + token);

                //APPEL DE GET ARTIST's TOP TRACK request
                $.ajax({
                  url: `https://api.spotify.com/v1/artists/${id_artiste}/top-tracks?market=FR`,
                  type: 'GET',
                  headers: {
                      'Authorization' : 'Bearer ' + token
                  },
                  success: function(data: any) {

                    // Load our songs from Spotify into our page
                    let num_of_tracks = data.tracks.length;
                    console.log("Number of tracks : " + num_of_tracks);


                    let count = 0;
                    // Max number of songs is 12
                    const max_songs = 20;
                    while(count < max_songs && count < num_of_tracks){
                      // Extract the id of the FIRST song from the data object

                      let id = data.tracks[count].id;
                      let track_name = data.tracks[count].name;
                      let album_name = data.tracks[count].album.name;
                      console.log("id="+id+ "artist : " + artist_name + " name:"+track_name + " album : " + album_name);

                      tracks[count] = new Track(track_name, artist_name,album_name,id);
                      count++;
                    }
                  }
                }); // End of Spotify ajax call
              }
            }); // End of Spotify ajax call
            this.apiService.envoyerRecherche(tracks);
            }
            break;
          //Regroupement des données par album
          case "album": {
              let tracks: Track[] = [];
              // Make Spotify API call
              // Note: We are using the track API endpoint.
              let search_query = encodeURI(value);
              console.log("Recherche de " + search_query + " type sélectiooné : "+ this.selectedType +" avec token " + token);
              $.ajax({
                url: `https://api.spotify.com/v1/search?q=${search_query}&type=album`,
                type: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + token
                },
                success: function(data: any) {

                  // Load our songs from Spotify into our page
                  let num_of_tracks = data.albums.items[0].total_tracks;
                  let album_id = data.albums.items[0].id;
                  let album_name = data.albums.items[0].name;
                  console.log("name : " + album_name + "Number of tracks : " + num_of_tracks + "id: " + album_id);

                  let id_album = encodeURI(album_id);
                  console.log("Recherche de " + id_album +" avec token " + token);

                  //APPEL DE GET ALBUM TRACK's REQUEST
                  $.ajax({
                    url: `https://api.spotify.com/v1/albums/${id_album}/tracks`,
                    type: 'GET',
                    headers: {
                        'Authorization' : 'Bearer ' + token
                    },
                    success: function(data: any) {

                      // Load our songs from Spotify into our page
                      let num_of_tracks = data.items.length;
                      console.log("Number of tracks : " + num_of_tracks);


                      let count = 0;
                      // Max number of songs is 12
                      const max_songs = 20;
                      while(count < max_songs && count < num_of_tracks){
                        // Extract the id of the FIRST song from the data object

                        let id = data.items[count].id;
                        let track_name = data.items[count].name;
                        let track_number = data.items[count].track_number;
                        //let album_name = "data.items[count].album.name";
                        let artist_name = data.items[count].artists[0].name;
                        console.log("id="+id+ "artist : " + artist_name + " name:"+track_name, " tracknumb :" + track_number + " album : " + album_name);

                        tracks[count] = new Track(track_name, artist_name,album_name,id);
                        count++;
                      }
                    }
                  }); // End of Spotify ajax call
                }
              }); // End of Spotify ajax call
              this.apiService.envoyerRecherche(tracks);
            }
            break;
        }
      });

	}

  //Gére le changement d'état des radio button + met à jour le contenu de la searchbar
  radioChangedHandler(event: any)
  {
    this.selectedType = event.target.value;
    this.searchbarPlaceHolderText = "un " + this.selectedType;
  }
}
