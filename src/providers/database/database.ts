
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { GlobalvarsProvider } from '../globalvars/globalvars';
import { updateImgs } from 'ionic-angular/umd/components/content/content';


@Injectable()
export class DatabaseProvider {

  constructor(private db: AngularFireDatabase,
    private afStorage: AngularFireStorage,
    private globalvars: GlobalvarsProvider,
  ) {

  }

  //------------------------------------------------NOTICIAS

  GetAllNoticia() {

    let ref = this.db.list('noticias');

    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  
  }

  UploadToStoregedNews(info,imageURI): AngularFireUploadTask {

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

  SaveToDatabaseNews(imagemNoticia: string,metainfo,titulo,texto) {

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
    // return ref.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });
  
  }

  UploadToStoregedComics(info,imageURI): AngularFireUploadTask {

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

  SaveToDatabaseComics(imagemComics: string,metainfo,titulo,texto,preco,edicao) {

    let toSave = {
      titulo: titulo,
      descricao: texto,
      data: metainfo.timeCreated,
      fullPath: metainfo.fullPath,
      imagem: imagemComics,
      preco: preco,
      edicao:edicao,
      comprado:'',
    };
    
    return this.db.list('comics').push(toSave); 
  }

  GetAllPagesComics(comics){
    let ref = this.db.list('comics/' + comics + '/');

    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  //------------------------------------------------SLIDES

  GetAllSlides() {

    let ref = this.db.list('slides');

    return ref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  
  }

  UploadToStoregedSlides(info,imageURI): AngularFireUploadTask {

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

  SaveToDatabaseSlides(imagemSlide: string,metainfo,titulo,texto) {

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
    // this.numero = numPagina;

    // return this.db.database.ref('comics').push({
    //   titulo: this.nome,
    //   numero: numPagina,
    //   data: data,
    //   imagem: imgpath,
    //   descricao: '',
    // });
  }


  DeleteToStorageAndDatabase(file){
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

  GetComicsUser(uid){
    let ref = this.db.list('usuarios/'+uid);

    console.log(ref);
    return ref;
  }

  AddNewComicsForUser(titulo,uid){

    
    let hqProcurada = this.GetAllComics().valueChanges();
    hqProcurada.subscribe(res => { 

       let User: any[];
       let hqlista: any[];
       hqlista = res;
   
       
           let aux = this.GetComicsUser(uid).valueChanges();
           
         
           aux.subscribe(res => {
            
             User = res;
             console.log('User ' + User[0]); 

             for(let i = 0; i <hqlista.length; i++){
              console.log('titluo: ' + hqlista[i].titulo);
              
              if(hqlista[i].titulo == titulo){
                console.log('sim');
                console.log( this.db.database.ref('usuarios').child(uid).child('hqs').set(titulo));
                
                this.db.database.ref('usuarios').child(uid).child('hqs').set(titulo)
                  .then(() => {
                    console.log("Criado");
                    return null;
                  })
                  .catch((error) => {
                    console.log(error);
                  });
             
                return null;
              }else{
                console.log('não');
              }

             }

       });    

    },error => {
      console.log("HQ ano encontrada");
      return null;
    });
    
   
  } 

}


