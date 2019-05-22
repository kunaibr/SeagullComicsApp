import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
// import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../../providers/database/database';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {

  imgPath: string;
  fileToUpload: any;

  hqPath: string;

  imageResponse: any;
  options: any;

  public loader;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public dataProvider: DatabaseProvider,
    //private AlertCtrl: AlertController,
    private toastCtrl: ToastController,
    private camera: Camera,
    public loadingCtrl: LoadingController,

  ) {
  }

  //Carrega a pagina
  AbreCarregador() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando",
    });
    this.loader.present();
  }

  FechaCarregador() {
    this.loader.dismiss();
  }


  AddNews(tituloNoticia: string, textoNoticia: string, dataNoticia: string, imagemNoticia: string) {
    this.AbreCarregador();

    this.dataProvider.AddNews(tituloNoticia, textoNoticia, dataNoticia, imagemNoticia).
      then(() => {
        let toast = this.toastCtrl.create({
          message: "Seu envio foi um Suceso",
          duration: 3000
        });
        toast.present();

      }).catch((error) => {
        console.log(error);
      });

    this.FechaCarregador();

  }



  AddSlide() {

  }

  AddComic(titulo,data) {

    this.AbreCarregador();
    //uploads img to firebase storage
    this.dataProvider.UploadHqs(this.imgPath,titulo)
      .then(photoURL => {
        this.hqPath = photoURL;
        let toast = this.toastCtrl.create({
          message: 'Image was updated successfully',
          duration: 3000
        });
        toast.present();
      }).catch((error) => {
        console.log("Erro no Add Comics" + error);
      });

      
      this.Save('1', this.hqPath, data);

    this.FechaCarregador();
  }
  EscolherFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: 0,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imgPath = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log("Escolher" + err);
    });
  }


  Save(numero: string, photoURL, data) {

      this.dataProvider.SaveHqs(numero, photoURL, data).
      then(() => {
        let toast = this.toastCtrl.create({
          message: "Seu envio foi um Suceso",
          duration: 3000
        });
        toast.present();
        console.log('oi');
      }).catch((error) => {
        console.log(error);
      });
  }
}


