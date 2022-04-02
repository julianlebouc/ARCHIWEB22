import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from './../../services/api.service';
import * as $ from "jquery";
import { Tokens } from '../../models/Tokens';
import { Track } from '../../models/Track';
import { Subject, Observable } from 'rxjs';

/*
  *
  * COMPOSANT RECHERCHE
  *    OBJECTIFS : Afficher une barre de recherche à l'écran, récupérer les valeurs saisies par l'utilisateur
  *                Effectuer des requêtes à l'API spotify pour transmettre les données
  *
*/
@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent{
  recherche = "";
  selectedType: String = "titre"; //Type de recherche sélectionné
  searchbarPlaceHolderText: string = "un titre";//Ce qui est affiché dans la barre de recherche par défaut
  accessToken!: String; //Contient le token d'accès

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
	  param type_recherche : string "titre", "artiste" ou "album"
	*/
  @HostListener('clickRechercher')
	clickRechercher(value: string): void {
    this.getToken()
      .subscribe( token => {
        //Recherche en fonction du critère selectionné
        switch(this.selectedType)
        {
          //Recherche par titre
          case "titre": {
              //Initialisation de la liste des tracks
              let tracks: Track[] = [];

              //Appel serveur vers l'API Spotify
              let search_query = encodeURI(value);
              console.log("Recherche de " + search_query + " type sélectiooné : "+ this.selectedType +" avec token " + token);
              $.ajax({
                url: `https://api.spotify.com/v1/search?q=${search_query}&type=track`,
                type: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + token
                },
                success: function(data: any) {
                  //Compter le nombres de résultats retournés
                  let num_of_tracks = data.tracks.items.length;
                  let count = 0;
                  //Fixer le nombre maximum de morceau à 12
                  const max_songs = 12;
                  while(count < max_songs && count < num_of_tracks){
                    //Récupération des données
                    let id = data.tracks.items[count].id;
                    let track_name = data.tracks.items[count].name;
                    let track_number = data.tracks.items[count].track_number;
                    let album_name = data.tracks.items[count].album.name;
                    let artist_name = data.tracks.items[count].artists[0].name;
                    console.log("id="+id+ "artist : " + artist_name + " name:"+track_name, " tracknumb :" + track_number + " album : " + album_name);

                    //Ajout d'une track dans la liste
                    tracks[count] = new Track(track_name, artist_name,album_name,id);
                    count++;
                  }

                }
              });
              //Envoi des tracks au composant résultat recherche
              this.apiService.envoyerRecherche(tracks);
            }
            break;

          //Recherche par artiste
          case "artiste": {
            //Liste des tracks qui seront retournées
            let tracks: Track[] = [];

            //Appel serveur vers l'API Spotify
            let search_query = encodeURI(value);
            console.log("Recherche de " + search_query + " type sélectiooné : "+ this.selectedType +" avec token " + token);
            $.ajax({
              url: `https://api.spotify.com/v1/search?q=${search_query}&type=artist`,
              type: 'GET',
              headers: {
                  'Authorization' : 'Bearer ' + token
              },
              success: function(data: any) {
                //Récupération de l'ID et du nom de l'artiste
                let artist_id = data.artists.items[0].id;
                let artist_name = data.artists.items[0].name;
                console.log("name : " + artist_name + "id: " + artist_id);

                let id_artiste = encodeURI(artist_id);
                console.log("Recherche de " + id_artiste +" avec token " + token);

                //Requête serveur vers l'aPI spotify, cette fois ci, on recherche les top-tracks en fonction de l'id de l'artiste
                $.ajax({
                  url: `https://api.spotify.com/v1/artists/${id_artiste}/top-tracks?market=FR`,
                  type: 'GET',
                  headers: {
                      'Authorization' : 'Bearer ' + token
                  },
                  success: function(data: any) {
                    //Compter les résultats obtenus
                    let num_of_tracks = data.tracks.length;
                    console.log("Number of tracks : " + num_of_tracks);
                    let count = 0;
                    //Limitation des résultats à 20 maximum
                    const max_songs = 20;
                    while(count < max_songs && count < num_of_tracks){
                      //Récupération des données
                      let id = data.tracks[count].id;
                      let track_name = data.tracks[count].name;
                      let album_name = data.tracks[count].album.name;
                      console.log("id="+id+ "artist : " + artist_name + " name:"+track_name + " album : " + album_name);

                      tracks[count] = new Track(track_name, artist_name,album_name,id);
                      count++;
                    }
                  }
                });
              }
            });
            //Envoi des résultats au composants résultat-recherche
            this.apiService.envoyerRecherche(tracks);
            }
            break;
          //Recherche par album
          case "album": {
              //Liste des tracks qui seront retournées
              let tracks: Track[] = [];

              //Appel serveur vers l'API Spotify, recherche des albums
              let search_query = encodeURI(value);
              console.log("Recherche de " + search_query + " type sélectiooné : "+ this.selectedType +" avec token " + token);
              $.ajax({
                url: `https://api.spotify.com/v1/search?q=${search_query}&type=album`,
                type: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + token
                },
                success: function(data: any) {

                  //Récupération du nombre de tracks de l'album et de son id
                  let num_of_tracks = data.albums.items[0].total_tracks;
                  let album_id = data.albums.items[0].id;
                  let album_name = data.albums.items[0].name;
                  console.log("name : " + album_name + "Number of tracks : " + num_of_tracks + "id: " + album_id);

                  let id_album = encodeURI(album_id);
                  console.log("Recherche de " + id_album +" avec token " + token);

                  //Appel serveur vers l'API , cette fois ci on va chercher une liste de tracks
                  $.ajax({
                    url: `https://api.spotify.com/v1/albums/${id_album}/tracks`,
                    type: 'GET',
                    headers: {
                        'Authorization' : 'Bearer ' + token
                    },
                    success: function(data: any) {
                      //Compter les résultats obtenus
                      let num_of_tracks = data.items.length;
                      console.log("Number of tracks : " + num_of_tracks);
                      let count = 0;
                      //Limiter le nombre de résultats à 20 maximums
                      const max_songs = 20;
                      while(count < max_songs && count < num_of_tracks){
                        //Récupration des données
                        let id = data.items[count].id;
                        let track_name = data.items[count].name;
                        let track_number = data.items[count].track_number;
                        let artist_name = data.items[count].artists[0].name;
                        console.log("id="+id+ "artist : " + artist_name + " name:"+track_name, " tracknumb :" + track_number + " album : " + album_name);

                        tracks[count] = new Track(track_name, artist_name,album_name,id);
                        count++;
                      }
                    }
                  });
                }
              });
              //Envoi des données vers le composant resultat recherche
              this.apiService.envoyerRecherche(tracks);
            }
            break;
        }
      });

	}

  //Gére le changement d'état des radio button
  //met à jour le texte par défaut dans la barre de recherche
  radioChangedHandler(event: any)
  {
    this.selectedType = event.target.value;
    this.searchbarPlaceHolderText = "un " + this.selectedType;
  }
}
