import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

/*
  Déclaration d'un PipeTransform
    Objectif : Sécuriser l'url source utilisé dans l'i-frame (lecteur musique)
*/
@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(protected _sanitizer: DomSanitizer) {
  }

  /*
    transform()
      params :  value -> un lien (string)
                type -> type de transformation
  */
  transform(value: string, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this._sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this._sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this._sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this._sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this._sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        return this._sanitizer.bypassSecurityTrustHtml(value);
    }
  }
}
