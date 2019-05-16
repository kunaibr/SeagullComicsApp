import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: AngularFireDatabase,
    ) {
  }

  AddNews(tituloNoticia:string,textoNoticia:string,dataNoticia:string,imagemNoticia:string){
    this.db.database.ref('/noticias').push({
      titulo: tituloNoticia,
      texto: textoNoticia,
      data: dataNoticia,
      imagem: imagemNoticia,
    })
    .then(() => { 
      
      console.log("Criado a noticia");
    })
    .catch((error) => {
      console.log(error);
    });

    
  }

  AddComic(){

  }

  AddSlide(){

  }

}
