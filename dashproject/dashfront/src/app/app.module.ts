import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultatRechercheComponent } from './components/resultat-recherche/resultat-recherche.component';
import { HeaderComponent } from './components/header/header.component';
import { RechercheComponent } from './components/recherche/recherche.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { MusiqueComponent } from './components/musique/musique.component';
//import { SearchBarDirectiveDirective } from './components/recherche/search-bar-directive.directive';

import { SafePipe } from './components/musique/custom-pipe';

@NgModule({
  declarations: [
    AppComponent,
    ResultatRechercheComponent,
    HeaderComponent,
    RechercheComponent,
    FooterComponent,
    MusiqueComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [SafePipe],
  providers: [SafePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
