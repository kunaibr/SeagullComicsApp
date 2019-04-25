import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-personagensview',
  templateUrl: 'personagensview.html',
})


export class PersonagensviewPage {

  personagens: Array<Object> = [];

  tabs:any = [];

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;

  SwipedTabsIndicator: any = null;

  constructor(public navCtrl: NavController) {
  
    this.tabs = [ 'md-snow','md-moon','md-leaf','md-rose','md-cog','md-planet','md-speedometer','md-bulb','md-magnet' ];

   this.personagens = [
     {
      'nome': 'Estrela Fria',
      'descricao': '',
      'poderes': '',
      'armas': '',
      'caracteristicas': '',
     },
     {
      'nome': 'Samurai Lunar',
      'descricao': '',
      'poderes': '',
      'armas': '',
      'caracteristicas': '',
     },
     {
      'nome': 'Coruja Prateada',
      'descricao': '',
      'poderes': '',
      'armas': '',
      'caracteristicas': '',
     },
     {
      'nome': 'Mika',
      'descricao': '',
      'poderes': '',
      'armas': '',
      'caracteristicas': '',
     },
     {
      'nome': 'Gnomo Cinzento',
      'descricao': '',
      'poderes': '',
      'armas': '',
      'caracteristicas': '',
     },
     {
      'nome': 'Guardião Eterno',
      'descricao': '',
      'poderes': '',
      'armas': '',
      'caracteristicas': '',
     },
     {
      'nome': 'Marcha 0',
      'descricao': '',
      'poderes': '',
      'armas': '',
      'caracteristicas': '',
     },
     {
      'nome': 'Texh',
      'descricao': '',
      'poderes': '',
      'armas': '',
      'caracteristicas': '',
     },
     {
      'nome': 'Onus',
      'descricao': '',
      'poderes': '',
      'armas': '',
      'caracteristicas': '',
     },
   
   ];

  
   

     console.log(this.personagens);
  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
  }

  selectTab(index) {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (100 * index) + '%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
    // A condição não pode ser maior que o index
    if (this.SwipedTabsSlider.length() > this.SwipedTabsSlider.getActiveIndex()) {
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (this.SwipedTabsSlider.getActiveIndex() * 100) + '%,0,0)';
    }

  }
  //Animação do indicador 
  animateIndicator($event) {
    if (this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress * (this.SwipedTabsSlider.length() - 1)) * 100) + '%,0,0)';
  }



}


