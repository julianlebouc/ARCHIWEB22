import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[btn btn-primary my-2]'
})
export class SearchBarDirectiveDirective {

  constructor(private el: ElementRef) { }
  
  @HostListener('clicked').onClick(){
  	//appel service avec barre de recherche
  	this.value="ok";
  }

}
