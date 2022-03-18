import { Component, OnInit, HostBinding } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Track } from '../../models/Track';

@Component({
  selector: 'app-resultat-recherche',
  templateUrl: './resultat-recherche.component.html',
  styleUrls: ['./resultat-recherche.component.css']
})
export class ResultatRechercheComponent implements OnInit {
	Musiques:any = [];
  Tracks!: Track[];
  @HostBinding()
  researchValue:string = "undefined";

  constructor(private apiService: ApiService) { }


  ngOnInit(): void {
    //Attente d'un évènement provenant du service API, contenant le terme de la recherche
    this.apiService.change.subscribe(tracks => {
      this.Tracks = tracks;
      console.log(tracks);
      //console.log("RESULTAT-RECH , researchValue = " + this.researchValue);
    });
  }

}
