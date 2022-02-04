import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-resultat-recherche',
  templateUrl: './resultat-recherche.component.html',
  styleUrls: ['./resultat-recherche.component.css']
})
export class ResultatRechercheComponent implements OnInit {
	Musiques:any = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  this.apiService.GetMusiques().subscribe(res => {
  	console.log(res)
  	this.Musiques=res;
 	 });
 }

}
