import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[btn btn-primary my-2]'
})
export class SearchBarDirectiveDirective {//!!!!!!!!!!!!!!!!!!MARCHE PAS LE SERVEUR NE SE LANCE PAS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!MODIFIEZ app.module.ts ET app.component.html!!!!!!!!!!!!!!!!!!!!!!
  constructor(private el: ElementRef) { }
  
  @HostListener('clicked').onClick(){
  	//appel service avec barre de recherche
  	this.value="ok";
  }

}
