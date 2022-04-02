import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../../models/Track';
import { SafePipe } from './custom-pipe';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-musique',
  templateUrl: './musique.component.html',
  styleUrls: ['./musique.component.css']
})
export class MusiqueComponent implements OnInit {
  @Input() track!: Track; //Importation de la classe Track (Contenu des requêtes échangées)
  src_frame!:string; //Lien brut pour le i-frame du player spotify
  safeUrl!: SafeResourceUrl; //Lien sécurisé pour le i-frame


  constructor(private safePipe: SafePipe, private domSanitizer: DomSanitizer)
  {
    safePipe = new SafePipe(this.domSanitizer);
  }

  src_test:string = `https://open.spotify.com/embed/track/63Ip2RzAZTzdKNxAhFPNxh`;

  ngOnInit(): void {
    this.src_frame = `https://open.spotify.com/embed/track/${this.track.linkFrame}`;
    //Sécurisation de l'URL
    this.safeUrl = this.safePipe.transform(this.src_frame, 'resourceUrl');
  }
}
