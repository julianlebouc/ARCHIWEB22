import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../../models/Track';
@Component({
  selector: 'app-musique',
  templateUrl: './musique.component.html',
  styleUrls: ['./musique.component.css']
})
export class MusiqueComponent implements OnInit {
  @Input() track!: Track;

  constructor() { }

  ngOnInit(): void {
  }

}
