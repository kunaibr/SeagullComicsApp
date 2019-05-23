import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatabaseProvider } from '../../providers/database/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {
  titulo: string;
  data: string;
  imgPath: string;
  fileToUpload: any;

  hqPath: string;

  imageResponse: any;
  options: any;

  filehq: Observable<any[]>;
  filenews: Observable<any[]>;
  public loader;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public dataProvider: DatabaseProvider,
    private AlertCtrl: AlertController,
    private toastCtrl: ToastController,
    private camera: Camera,
    public loadingCtrl: LoadingController,

  ) {

    this.filehq = this.dataProvider.GetAllHqs();
    this.filenews = this.dataProvider.GetAllNoticia();
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


  AddNews() {
  

    let inputAlert = this.AlertCtrl.create({
      title: '',
      inputs: [
        {
          name: 'titulo',
          placeholder: 'Escreva aqui o titulo',
        },
        {
          name: 'texto',
          placeholder: 'Escreva aqui o texto',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
        },
        {
          text: 'Salvar',
          handler: data => {
            this.UploadNoticia(data.info);
          }
        }
      ]
    });
    inputAlert.present();

  }

  UploadNoticia(info){

    this.AbreCarregador();

    let upload = this.dataProvider.UploadToStoregedNews(info,this.imgPath);

    upload.then().then(res => {
      console.log('res' + res);
      this.dataProvider.SaveToDatabaseNews(this.imgPath,res.metadata).then(() => {
        let toast = this.toastCtrl.create({
              message: "Seu envio foi um Suceso",
              duration: 3000
            });
            toast.present();
      });
    });

    this.FechaCarregador();
  }

  AddSlide() {

  }

  AddComic() {

    this.AbreCarregador();
    //uploads img to firebase storage
    this.dataProvider.UploadToStoregedHqs(this.imgPath, this.titulo)
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


    this.Save('1', this.hqPath, this.data);

    this.FechaCarregador();
  }


  Save(numero: string, photoURL, data) {

    // this.dataProvider.SaveToDatabaseHqs(numero, photoURL, data).
    //   then(() => {
    //     let toast = this.toastCtrl.create({
    //       message: "Seu envio foi um Sucesso",
    //       duration: 3000
    //     });
    //     toast.present();
    //     console.log('oi');
    //   }).catch((error) => {
    //     console.log(error);
    //   });
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

  Delete(file) {
    this.dataProvider.DeleteToStorageAndDatabase(file).subscribe(() => {
      let toast = this.toastCtrl.create({
              message: "Seu delete foi um Sucesso",
              duration: 3000
            });
            toast.present();
    });

  }

}


