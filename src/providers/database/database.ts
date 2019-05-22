
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
//import { AngularFireStorage } from '@angular/fire/storage';
//import * as firebase from 'firebase/app';

@Injectable()
export class DatabaseProvider {

  constructor(private db: AngularFireDatabase,
    //  private afStorage: AngularFireStorage,
    ) {

  }

  GetAllHqs(){
    return this.db.database.ref('/comics');
  }


  AddNews(tituloNoticia: string, textoNoticia: string, dataNoticia: string, imagemNoticia: string) {

    return this.db.database.ref('/noticias').push({
      titulo: tituloNoticia,
      texto: textoNoticia,
      data: dataNoticia,
      imagem: imagemNoticia,
    });

  }

  UploadHqs() {
  
  }

SaveHqs() {

  }
  Remove() {
   
  }

  getRetornarNoticia(noticias) {
    let listnews = this.db.database.ref('/noticias');


   listnews.on('value', (snapshot) => {
      const items = snapshot.val();

      if (items) {
        noticias = Object.keys(items).map(i => items[i]);
      }
    });
    
    return noticias;
  }

  getRetornarSlides() {
      
  }

  RemoveFile(fullPath: string) {
   
  }

  
}
