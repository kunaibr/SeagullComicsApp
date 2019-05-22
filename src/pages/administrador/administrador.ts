import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
// import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../../providers/database/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { basename } from 'path';

@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {

  hqName: string;
  hqKey: string;
  imgPath: string;
  fileToUpload: any;

  imageResponse: any;
  options: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public dataProvider: DatabaseProvider,
    //private AlertCtrl: AlertController,
    private toastCtrl: ToastController,
    private camera: Camera,

  ) {
  }

  AddNews(tituloNoticia: string, textoNoticia: string, dataNoticia: string, imagemNoticia: string) {
    
    this.dataProvider.AddNews(tituloNoticia, textoNoticia, dataNoticia, imagemNoticia).
    then(() =>{
      let toast = this.toastCtrl.create({
        message: "Seu envio foi um Suceso" ,
        duration: 3000
      });
      toast.present();
  
    }).catch((error) =>{
      console.log(error);
    });

   

  }



  AddSlide() {

  }

  AddComic(){

  //uploads img to firebase storage
  this.dataProvider.UploadHqs(this.imgPath)
  .then(photoURL => {

    let toast = this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    toast.present();
    })
  }
  EscolherFoto(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType:0,
      }
  
      this.camera.getPicture(options).then((imageData) => {
        this.imgPath = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
      });
    }


    Save() {
   

    }
  }


