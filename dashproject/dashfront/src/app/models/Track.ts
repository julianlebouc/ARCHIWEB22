/*
  CLASSE Track :
    Objet crée par le composant Recherche à partir des données SpotifyAPI
    Transféré vers le composant resultat-recherche sous forme de tableau
    ...qui transmet au composant musique une instance de cet objet à partir du tableau
*/
export class Track{
  constructor(public titre: string,
              public artiste: string,
              public album: string,
              public linkFrame: string){}
}
