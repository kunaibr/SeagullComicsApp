import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { DatabaseProvider } from '../../providers/database/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/Storage';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

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

  //COMICS
  searchHqs:any[];
  hqlista:any;
  hqsUser:string; 
  usuario:any;
  auxHq: Observable<any[]>;

  //SEASON
  searchSeason:any[];
  auxSeason: Observable<any[]>;

  //PAGES
  keyComic;
  hqsPages: Observable<any[]>;

  //
  stringComicId:string;
  stringSeasonId:string;

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
    private localnotification: LocalNotifications,
    private plt : Platform,

  ) {
    console.log('Key Comics : ' + this.storage.get('keyComic'));
   
    this.filenews = this.dataProvider.GetAllNoticia();

    this.GetRetornarComics();

    this.plt.ready().then(() => {
      
      this.localnotification.on('click').subscribe(res => {
        console.log('click', res);

        let msg = res.data ? res.data.mydata: '';
        this.showAlert(res.title, res.text, msg);

      });

      // this.localnotification.on('trigger').subscribe(res => {
      //   console.log('trigger', res);

      //   let msg = res.data ? res.data.mydata: '';
      //   this.showAlert(res.title, res.text, msg);

      // });
    });
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
          placeholder: '',
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
        {
          name: 'selo',
          placeholder: 'Escreva aqui o Selo do Arco',
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

            this.UploadComics(data.info,data.titulo,data.texto,data.edicao,data.selo);
          }
        }
      ]
    });
    inputAlert.present();

  }

  UploadComics(info,titulo,texto,edicao,selo){

    this.AbreCarregador();

    let upload = this.dataProvider.UploadToStoregedComics(info,this.imgPath);

    console.log('upload' + upload);

    upload.then().then(res => {
      console.log('res' + res.metadata);
      this.dataProvider.SaveToDatabaseComics(this.imgPath,res.metadata,titulo,texto,edicao,selo).then((response) => {
        let toast = this.toastCtrl.create({
              message: "Seu envio de Comic foi um Sucesso " + response.key,
              duration: 3000
            });
            toast.present();
         
            
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
          placeholder: 'Escreva aqui as pessoas creditadas',
        },
        {
          name: 'idcomic',
          placeholder: 'Escreva aqui o id da comic',
          value: this.stringComicId,
        },
        {
          name: 'descricao',
          placeholder: 'Escreva aqui a descrição',
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
            this.UploadComicsSeason(data.info,data.idcomic,data.numerodaseason,data.descricao);
          
          }
        }
      ]
    });
    inputAlert.present();

  }

  UploadComicsSeason(info,idcomic,numero,descricao){
    this.AbreCarregador();

    let upload = this.dataProvider.UploadToStorageComicsPage(info,this.imgPath);

    console.log('upload' + upload);

    upload.then().then(res => {
      console.log('res' + res.metadata);
      this.dataProvider.SaveToDatabaseComicsSeason(idcomic,this.imgPath,numero,res.metadata,descricao,info).then((response) => {
        let toast = this.toastCtrl.create({
              message: "Seu envio de Season foi um Sucesso " + response.key,
              duration: 3000
            });
            toast.present();
           
            this.FechaCarregador();
          
      });
    });
    
    this.FechaCarregador();
  }
 
  AddComicsPage(){
    let inputAlert = this.AlertCtrl.create({
      title: 'Criar Page',
      inputs: [
        {
          name: 'info',
          placeholder: 'Escreva aqui o informação',
        },
        {
          name: 'idcomic',
          placeholder: 'Escreva aqui o id da comic',
          value: this.stringComicId,
        },
        {
          name: 'idseason',
          placeholder: 'Escreva aqui o numero da season',
          value: this.stringSeasonId,
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

  this.stringComicId = keyComic.key;
  
  this.AbreCarregador();
  
  this.keyComic = keyComic;

  this.auxSeason = this.dataProvider.GetAllSeason(keyComic).valueChanges();
  this.auxSeason.subscribe(res => {
   
    this.searchSeason = res;
    
    this.FechaCarregador();
  });

}

GetPages(keySeason) {

  this.stringSeasonId = keySeason.key;

  this.hqsPages = this.dataProvider.GetAllComicsPages(this.keyComic.key + '/season/' + keySeason.key);
}


//Notifications

notificationSchedule(){
  console.log('trigger');
this.localnotification.schedule({
  id: 1,
  title: 'Atenção',
  text: 'Seagull Comics notification',
  data: {mydata: 'My hidden'},
  trigger: {in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
  //foreground: true,
});
console.log('trigger2');
}

showAlert(header,sub,msg){
 let alert = this.AlertCtrl.create({
  title: header,
  subTitle: sub,
  message: msg,
  buttons: ['OK'],
 });
alert.present();
}

}




