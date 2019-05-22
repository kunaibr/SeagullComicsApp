
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
//import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';

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

  UploadHqs(imageURI) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };
  
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
