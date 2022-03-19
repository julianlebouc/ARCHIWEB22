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
  @Input() track!: Track;
  src_frame!:string;

  safeUrl!: SafeResourceUrl;
  constructor(private safePipe: SafePipe, private domSanitizer: DomSanitizer)
  {
    safePipe = new SafePipe(this.domSanitizer);
  }

  src_test:string = `https://open.spotify.com/embed/track/63Ip2RzAZTzdKNxAhFPNxh`;

  ngOnInit(): void {
    this.src_frame = `https://open.spotify.com/embed/track/${this.track.linkFrame}`;
    this.safeUrl = this.safePipe.transform(this.src_frame, 'resourceUrl');
  }
}
