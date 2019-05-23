
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase/app';


@Injectable()
export class DatabaseProvider {

  constructor(private db: AngularFireDatabase,
    private afStorage: AngularFireStorage,
  ) {

  }

  GetAllHqs() {
    let ref = this.db.list('comics');

    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }


  UploadToStoregedNews(info,imageURI): AngularFireUploadTask {

    let newName = `${new Date().getTime()}.txt`;

    new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(newName);
      this.EncodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.downloadURL)
          }, err => {
            reject(err);
          })
      })
    });


  return this.afStorage.ref(`noticias/${newName}`).putString(info);
  }


  UploadToStoregedHqs(imageURI, titulo) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(titulo);
      this.EncodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.downloadURL)
          }, err => {
            reject(err);
          })
      })
    });

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
  };

  SaveToDatabaseHqs(metainfo) {

    let toSave = {
      datacreate: metainfo.timeCreated,
      url: metainfo.downloadURLs[0],
      fullPath: metainfo.fullPath,
      contentType: metainfo.contentType,
    }

    return this.db.list('comics').push(toSave); 
    // this.numero = numPagina;

    // return this.db.database.ref('comics').push({
    //   titulo: this.nome,
    //   numero: numPagina,
    //   data: data,
    //   imagem: imgpath,
    //   descricao: '',
    // });
  }

  SaveToDatabaseNews(imagemNoticia: string,metainfo) {

    let toSave = {
      titulo: metainfo.titulo,
      texto: metainfo.texto,
      data: metainfo.timeCreated,
      imagem: imagemNoticia,
    }

    return this.db.list('noticias').push(toSave); 
  }

  DeleteToStorageAndDatabase(file){
    let key = file.key;
    let storagedPath = file.fullPath;

    //Remove from database
    this.db.list('comics').remove(key);
    //Remove from storage
    return this.afStorage.ref(storagedPath).delete();
  }


  Remove() {

  }

  GetAllNoticia() {

    let ref = this.db.list('noticias');

    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
      // let listnews = this.db.database.ref('noticias');


    // listnews.on('value', (snapshot) => {
    //   const items = snapshot.val();

    //   if (items) {
    //     noticias = Object.keys(items).map(i => items[i]);
    //   }
    // });

    // return noticias;
  
  }

  

  getRetornarSlides() {

  }

  RemoveFile(fullPath: string) {

  }


}
