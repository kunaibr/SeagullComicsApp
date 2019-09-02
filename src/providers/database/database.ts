
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/Storage';
import { Observable } from 'rxjs';



@Injectable()
export class DatabaseProvider {

  constructor(private db: AngularFireDatabase,
    private afStorage: AngularFireStorage,
    private storage: Storage,
  ) {

  }

  //------------------------------------------------NOTICIAS

  GetAllNoticia() {

    let ref = this.db.list('noticias');

    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  UploadToStoregedNews(info, imageURI): AngularFireUploadTask {

    let newName = `${new Date().getTime()}.txt`;

    new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('noticias').child(newName);
      this.EncodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.downloadURL);
            console.log("snapshot" + snapshot.downloadURL);
          }, err => {
            reject(err);
          })
      })
    });


    return this.afStorage.ref(`noticias/${newName}`).putString(info);
  }

  SaveToDatabaseNews(imagemNoticia: string, metainfo, titulo, texto) {

    let toSave = {
      titulo: titulo,
      texto: texto,
      data: metainfo.timeCreated,
      fullPath: metainfo.fullPath,
      imagem: imagemNoticia,
    };

    return this.db.list('noticias').push(toSave);
  }


  //------------------------------------------------COMICS

  GetAllComics() {

    let ref = this.db.list('comics');

    return ref;

  }

  GetAllSeason(key) {

    let ref = this.db.list('comics/' + key.key + '/season');

    return ref;

  }

  UploadToStoregedComics(info, imageURI): AngularFireUploadTask {

    let newName = `${new Date().getTime()}.txt`;

    new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('comics').child(newName);
      this.EncodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.downloadURL);
            console.log("snapshot" + snapshot.downloadURL);
          }, err => {
            reject(err);
          })
      })
    });


    return this.afStorage.ref(`comics/${newName}`).putString(info);
  }

  SaveToDatabaseComics(imagemComics: string, metainfo, titulo, texto, edicao, selo: string, creditos) {

    let toSave = {
      creditos: creditos,
      key: '',
      titulo: titulo,
      descricao: texto,
      data: metainfo.timeCreated,
      fullPath: metainfo.fullPath,
      imagem: imagemComics,
      edicao: edicao,
      selo: selo,
      season: imagemComics,
    };

    let ref = this.db.list('comics').push(toSave);
    this.db.database.ref('comics/' + ref.key + '/key').set(ref.key);
    return ref;
  }

  GetAllComicsPages(key) {
    let ref = this.db.list('comics/' + key + '/pages');
    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  GetAllSeasonPages(key) {
    let ref = this.db.list('comics/' + key + '/completeSeason');
    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }


  UploadToStorageComicsPage(info, imageURI) {

    let newName = `${new Date().getTime()}.txt`;

    new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('comics/pages').child(newName);
      this.EncodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.downloadURL);
            console.log("snapshot" + snapshot.downloadURL);
          }, err => {
            reject(err);
          })
      })
    });


    return this.afStorage.ref(`comics/pages/${newName}`).putString(info);
  }

  SaveToDatabaseComicsSeason(keyComic: string, imagem: string, numero: string, metainfo, descricao: string) {

    let toSave = {
      key: '',
      data: metainfo.timeCreated,
      numero: numero,
      descricao: descricao,
      imagem: imagem,
      pages: imagem,
    };

    let ref = this.db.list('comics/' + keyComic + '/season').push(toSave);
    this.db.database.ref('comics/' + keyComic + '/season/' + ref.key + '/key').set(ref.key);
    return ref;
  }

  SaveToDatabaseComicsPage(keyComic: string, keySeason: string, imagem: string, numero: string, metainfo) {

    let toSave = {
      numero: numero,
      imagem: imagem,
    };

    let toSaveComplete = {
      imagem: imagem,
    }

    
    this.db.list('comics/' + keyComic + '/completeSeason').push(toSaveComplete);  
    return this.db.list('comics/' + keyComic + '/season/' + keySeason + "/pages").push(toSave);



  }





  //------------------------------------------------SLIDES

  GetAllSlides() {

    let ref = this.db.list('slides');

    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  UploadToStoregedSlides(info, imageURI): AngularFireUploadTask {

    let newName = `${new Date().getTime()}.txt`;

    new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('slides').child(newName);
      this.EncodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.downloadURL);
            console.log("snapshot" + snapshot.downloadURL);
          }, err => {
            reject(err);
          })
      })
    });


    return this.afStorage.ref(`slides/${newName}`).putString(info);
  }

  SaveToDatabaseSlides(imagemSlide: string, metainfo, titulo, texto) {


    let toSave = {
      titulo: titulo,
      texto: texto,
      data: metainfo.timeCreated,
      fullPath: metainfo.fullPath,
      imagem: imagemSlide,
    };

    return this.db.list('slides').push(toSave);
  }


  //------------------------------------------------IMAGENS

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
  }


  DeleteToStorageAndDatabase(file) {
    let key = file.key;
    let storagedPath = file.fullPath;

    //Remove from database
    this.db.list('comics').remove(key);
    //Remove from storage
    return this.afStorage.ref(storagedPath).delete();
  }


  RemoveFile(fullPath: string) {

  }


  //------------------------------------------------USER

  GetUser(uid) {
    let ref = this.db.list('usuarios/' + uid);
    console.log(uid);

    return ref.valueChanges();
  }

  AddNewComicsForUser(texto, uid) {
    this.db.database.ref('usuarios/').child(uid).child('hqs').set("");
    return this.db.database.ref('usuarios/').child(uid).child('hqs').set(texto);
  }

  AddToBibliotecaComic(titulo, uid) {
    let UserHQ: any;

    let auxHq: Observable<any[]>;

    let plus = "";
    
    auxHq = this.db.list('usuarios/' + uid).valueChanges();
    auxHq.subscribe(res => {
      let aux: any[];
      aux = res;
      UserHQ = aux[1];
    });

    
    if (UserHQ == "") {
      plus = titulo; 

    }else{
      plus = UserHQ + ","  + titulo;
     
    }

    console.log("Plus: " + plus);
    return this.db.database.ref('usuarios/' + uid + '/biblioteca').set(plus);
  }



  GetUidUser() {
    return this.storage.get('user');

  }

}


