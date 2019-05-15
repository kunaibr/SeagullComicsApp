import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    ) {
  }

  AddNews(tituloNoticia:string){
    console.log(tituloNoticia);
  }

  AddComic(){

  }

  AddSlide(){

  }

}
