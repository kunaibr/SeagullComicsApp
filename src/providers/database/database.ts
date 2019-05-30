
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/Storage';


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

  SaveToDatabaseComics(imagemComics: string, metainfo, titulo, texto, preco, edicao) {

    let toSave = {
      key: '',
      titulo: titulo,
      descricao: texto,
      data: metainfo.timeCreated,
      fullPath: metainfo.fullPath,
      imagem: imagemComics,
      preco: preco,
      edicao: edicao,
      comprado: '',
      pages: imagemComics,
    };

    let ref = this.db.list('comics').push(toSave);
    this.db.database.ref('comics/'+ ref.key + '/key').set(ref.key);
    return ref;
  }

  GetAllComisPages(key) {
    let ref = this.db.list('comics/' + key + '/pages');
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

  SaveToDatabaseComicsPage(key: string, imagem: string,numero:string, metainfo)
  {
    
    let toSave = {
      numero: numero,
      //fullPath: metainfo.fullPath,
      imagem: imagem,
    };

    return this.db.list('comics/'+key+'/pages').push(toSave);
    
    

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
    let ref = this.db.list('usuarios/' + uid).valueChanges();

    console.log(ref);
    return ref;
  }

  GetComicsUser(uid) {
    let ref = this.db.list('usuarios/' + uid);

    return ref;
  }

  AddNewComicsForUser(titulo, uid) {
    let UserHQ: any;
    let hqlista: any[];

    this.GetAllComics().valueChanges().subscribe(res => {

      hqlista = res;


      console.log('Lista de Hqs: ' + hqlista);

      this.GetComicsUser(uid).valueChanges().subscribe(rese => {

        UserHQ = rese[1];
        console.log('Hqs do usuario: ' + UserHQ);


        for (let i = 0; i < hqlista.length; i++) {

          console.log('titluo da hq: ' + hqlista[i].titulo);

          if (hqlista[i].titulo == titulo) {

            let plus = "";

            if (UserHQ != undefined && UserHQ != '') {
              plus = UserHQ + ",";
            }
            this.db.database.ref('usuarios/').child(uid).child('hqs').set("");
            return this.db.database.ref('usuarios/').child(uid).child('hqs').set(plus + titulo);
          } else {
            console.log('não');
          }

        }

      }, error => {
        console.log("HQ ano encontrada");

      });

    }, error => {
      console.log("HQ ano encontrada");

    });
    return null;

  }

  GetToAdm(){
  return this.storage.get('user');

  }

}


