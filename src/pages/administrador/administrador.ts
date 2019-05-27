import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatabaseProvider } from '../../providers/database/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/Storage';

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

  filehq: Observable<any[]>;
  filenews: Observable<any[]>;

  keyComics:string;
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
    private storage: Storage,

  ) {
    console.log('Key Comics : ' + this.storage.get('keyComic'));
   
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

   //-----------------------------------------------------------NOTICIAS

  AddNews() {
  

    let inputAlert = this.AlertCtrl.create({
      title: 'Criar Noticias',
      inputs: [
        {
          name: 'info',
          placeholder: 'Escreva aqui o informação',
        },
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

            this.UploadNoticia(data.info,data.titulo,data.texto);
          }
        }
      ]
    });
    inputAlert.present();

  }

  UploadNoticia(info,titulo,texto){

    this.AbreCarregador();

    let upload = this.dataProvider.UploadToStoregedNews(info,this.imgPath);

    console.log('upload' + upload);

    upload.then().then(res => {
      console.log('res' + res.metadata);
      this.dataProvider.SaveToDatabaseNews(this.imgPath,res.metadata,titulo,texto).then(() => {
        let toast = this.toastCtrl.create({
              message: "Seu envio de Noticia foi um Sucesso",
              duration: 3000
            });
            toast.present();
            this.FechaCarregador();
            this.imgPath = "";
      });
    });

  }

  //-----------------------------------------------------------SLIDES

  AddSlides() {
  

    let inputAlert = this.AlertCtrl.create({
      title: 'Criar Slides',
      inputs: [
        {
          name: 'info',
          placeholder: 'Escreva aqui o informação',
        },
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

            this.UploadSlides(data.info,data.titulo,data.texto);
          }
        }
      ]
    });
    inputAlert.present();

  }

  UploadSlides(info,titulo,texto){

    this.AbreCarregador();

    let upload = this.dataProvider.UploadToStoregedSlides(info,this.imgPath);

    upload.then().then(res => {
      console.log('res' + res.metadata);
      this.dataProvider.SaveToDatabaseSlides(this.imgPath,res.metadata,titulo,texto).then(() => {
        let toast = this.toastCtrl.create({
              message: "Seu envio de Slide foi um Sucesso",
              duration: 3000
            });
            toast.present();
            this.FechaCarregador();
            this.imgPath = "";
      });
    });

  }

   //-----------------------------------------------------------COMICS

  AddComics() {

    let inputAlert = this.AlertCtrl.create({
      title: 'Criar Comics',
      inputs: [
        {
          name: 'info',
          placeholder: 'Escreva aqui o informação',
        },
        {
          name: 'titulo',
          placeholder: 'Escreva aqui o titulo',
        },
        {
          name: 'texto',
          placeholder: 'Escreva aqui o descricao',
        },
        {
          name: 'preco',
          placeholder: 'Escreva aqui o preco',
        },
        {
          name: 'edicao',
          placeholder: 'Escreva aqui o numero da edição',
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

            this.UploadComics(data.info,data.titulo,data.texto,data.preco,data.edicao);
          }
        }
      ]
    });
    inputAlert.present();

  }

  UploadComics(info,titulo,texto,preco,edicao){

    this.AbreCarregador();

    let upload = this.dataProvider.UploadToStoregedComics(info,this.imgPath);

    console.log('upload' + upload);

    upload.then().then(res => {
      console.log('res' + res.metadata);
      this.dataProvider.SaveToDatabaseComics(this.imgPath,res.metadata,titulo,texto,preco,edicao).then((response) => {
        let toast = this.toastCtrl.create({
              message: "Seu envio de Comic foi um Sucesso " + response.key,
              duration: 3000
            });
            toast.present();
           
            this.keyComics = response.key;
            this.storage.set('KeyComic',response.key);
            this.FechaCarregador();

            this.imgPath = "";
           
      });
    });
    
  }

  AddComicsPage(){
    let inputAlert = this.AlertCtrl.create({
      title: 'Criar Comics',
      inputs: [
        {
          name: 'info',
          placeholder: 'Escreva aqui o informação',
        },
        {
          name: 'numerodapagina',
          placeholder: 'Escreva aqui o numero da pagina',
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
            this.UploadComicsPage(data.info,data.numero);
          
          }
        }
      ]
    });
    inputAlert.present();

  }

  UploadComicsPage(info,numero){
    this.AbreCarregador();

    let upload = this.dataProvider.UploadToStorageComicsPage(info,this.imgPath);

    console.log('upload' + upload);

    upload.then().then(res => {
      console.log('res' + res.metadata);
      this.dataProvider.SaveToDatabaseComicsPage(this.keyComics,this.imgPath).then(() => {
        let toast = this.toastCtrl.create({
              message: "Seu envio da Pagina foi um Sucesso",
              duration: 3000
            });
            toast.present();

            this.FechaCarregador();

            this.imgPath = "";
      });
    });
    
  }
 

  //-------------------------------------------------------------IMAGENS

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

  //-------------------------------------------------------------USER

AddUser(){
  let inputAlert = this.AlertCtrl.create({
    title: 'Add Comics para o Usuario',
    inputs: [
      {
        name: 'titulo',
        placeholder: 'Escreva aqui o titulo da hq',
      },
      {
        name: 'uid',
        placeholder: 'Escreva aqui a uid do usuario',
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

          this.AddComicsForUser(data.titulo,data.uid);
        }
      }
    ]
  });
  inputAlert.present();

}

  AddComicsForUser(titulo,uid){

    this.AbreCarregador();

    this.dataProvider.AddNewComicsForUser(titulo,uid);
   

    let toast = this.toastCtrl.create({
      message: "Foi add " + titulo + " para o usuario",
      duration: 3000
    });
    toast.present();

   
    this.FechaCarregador();

  }
}


