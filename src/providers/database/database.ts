
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
//import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';


@Injectable()
export class DatabaseProvider {


  capa: string = '';
  nome: string = '';
  numero: string = '';
  fullPath: string = '';


  constructor(private db: AngularFireDatabase,
    //private afStorage: AngularFireStorage,
  ) {

  }

  GetAllHqs() {
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

  UploadHqs(imageURI, titulo) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child('titulo');
      this.EncodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.downloadURL)
          }, err => {
            reject(err);
          })
      })
    })
  }

  EncodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;


    this.nome = img.title;
    this.numero = '1';
  };

  SaveHqs(numPagina: string, imgpath: string, data: string) {
    this.numero = numPagina;
    this.fullPath = imgpath;

    return this.db.database.ref('/noticias').push({
      fullPath: this.fullPath,
      titulo: this.nome,
      numero: numPagina,
      data: data,
      imagem: imgpath,
      descricao: '',
    });
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

  getRetornarHqs(hqs) {
    let listhqs = this.db.database.ref('/comics');


    listhqs.on('value', (snapshot) => {
      const items = snapshot.val();

      if (items) {
        hqs = Object.keys(items).map(i => items[i]);
      }
    });

    return hqs;
  }

  getRetornarSlides() {

  }

  RemoveFile(fullPath: string) {

  }


}
