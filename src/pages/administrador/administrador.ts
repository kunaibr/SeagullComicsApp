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
  keySeason:string;
  public loader;

  searchHqs:any[];
  hqlista:any;
  hqsUser:string; 
  usuario:any;
  auxHq: Observable<any[]>;

  searchSeason:any[];
  auxSeason: Observable<any[]>;

  keyComic;
  hqsPages: Observable<any[]>;

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

    this.GetRetornarComics();
  }
  ionViewDidOpen() {
    this.GetRetornarComics();
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

            this.UploadComics(data.info,data.titulo,data.texto,data.edicao);
          }
        }
      ]
    });
    inputAlert.present();

  }

  UploadComics(info,titulo,texto,edicao){

    this.AbreCarregador();

    let upload = this.dataProvider.UploadToStoregedComics(info,this.imgPath);

    console.log('upload' + upload);

    upload.then().then(res => {
      console.log('res' + res.metadata);
      this.dataProvider.SaveToDatabaseComics(this.imgPath,res.metadata,titulo,texto,edicao).then((response) => {
        let toast = this.toastCtrl.create({
              message: "Seu envio de Comic foi um Sucesso " + response.key,
              duration: 3000
            });
            toast.present();
           
            // this.keyComics = response.key;
            // this.storage.set('KeyComic',response.key);
            this.FechaCarregador();
           
           
           
      });
    });
    
  }

  AddComicsSeason(){
    let inputAlert = this.AlertCtrl.create({
      title: 'Criar Season',
      inputs: [
        {
          name: 'info',
          placeholder: 'Escreva aqui o informação',
        },
        {
          name: 'idcomic',
          placeholder: 'Escreva aqui o id da comic',
        },
        {
          name: 'numerodaseason',
          placeholder: 'Escreva aqui o numero da season',
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
            this.UploadComicsSeason(data.info,data.idcomic,data.numerodaseason);
          
          }
        }
      ]
    });
    inputAlert.present();

  }

  UploadComicsSeason(info,idcomic,numero){
    this.AbreCarregador();

    let upload = this.dataProvider.UploadToStorageComicsPage(info,this.imgPath);

    console.log('upload' + upload);

    upload.then().then(res => {
      console.log('res' + res.metadata);
      this.dataProvider.SaveToDatabaseComicsSeason(idcomic,this.imgPath,info,numero).then(() =>{
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
 
  AddComicsPage(){
    let inputAlert = this.AlertCtrl.create({
      title: 'Criar Comics',
      inputs: [
        {
          name: 'info',
          placeholder: 'Escreva aqui o informação',
        },
        {
          name: 'idcomic',
          placeholder: 'Escreva aqui o id da comic',
        },
        {
          name: 'idseason',
          placeholder: 'Escreva aqui o numero da season',
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
            this.UploadComicsPage(data.info,data.idcomic,data.idseason,data.numerodapagina);
          
          }
        }
      ]
    });
    inputAlert.present();

  }

  UploadComicsPage(info,idcomic,idseason,numero){
    this.AbreCarregador();

    

    let upload = this.dataProvider.UploadToStorageComicsPage(info,this.imgPath);

    console.log('upload' + upload);

    upload.then().then(res => {
      console.log('res' + res.metadata);
      this.dataProvider.SaveToDatabaseComicsPage(idcomic,idseason,this.imgPath,info,numero).then(() =>{
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
        name: 'assinado',
        placeholder: 'Escreva aqui o True ou False',
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

          this.AddComicsForUser(data.assinado,data.uid);
        }
      }
    ]
  });
  inputAlert.present();

  }

  AddComicsForUser(texto,uid){

    this.AbreCarregador();

    this.dataProvider.AddNewComicsForUser(texto,uid);
   

    let toast = this.toastCtrl.create({
      message: "Assinatura " + texto + " para o usuario",
      duration: 3000
    });
    toast.present();

   
    this.FechaCarregador();

  }

//---------------------------------------------------------------LIST

GetRetornarComics() {

  this.AbreCarregador();

  this.hqlista = this.dataProvider.GetComicsUser(this.usuario).valueChanges();
  this.hqlista.subscribe(res => {
 
  this.hqsUser = res[1];

  });

  this.auxHq = this.dataProvider.GetAllComics().valueChanges();
  this.auxHq.subscribe(res => {
    
  this.searchHqs = res;

  this.FechaCarregador();
    
  });

}

GetRetornarSeason(keyComic) {

  
  this.AbreCarregador();
  
  this.keyComic = keyComic;

  this.auxSeason = this.dataProvider.GetAllSeason(keyComic).valueChanges();
  this.auxSeason.subscribe(res => {
   
    this.searchSeason = res;
    
    this.FechaCarregador();
  });

}

GetPages(keySeason) {
  this.hqsPages = this.dataProvider.GetAllComicsPages(this.keyComic.key + '/season/' + keySeason.key);
}





}




