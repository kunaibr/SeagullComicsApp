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


  //Artists
  artist = {
    foto:"",
    nome:"",
    funcao:"",
  }

  aux: Observable<any[]>;
  
  artists:any[];

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
        {
          name: 'preco',
          placeholder: 'Preço: Gratis || Pago',
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

            this.UploadComics(data.info,data.titulo,data.texto,data.edicao,data.selo,data.preco);
          }
        }
      ]
    });
    inputAlert.present();

  }

  UploadComics(info,titulo,texto,edicao,selo,pago){

    this.AbreCarregador();

    let upload = this.dataProvider.UploadToStoregedComics(info,this.imgPath);

    console.log('upload' + upload);

    upload.then().then(res => {
      console.log('res' + res.metadata);
      this.dataProvider.SaveToDatabaseComics(this.imgPath,res.metadata,titulo,texto,edicao,selo,pago).then((response) => {
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
          placeholder: '',
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
      this.dataProvider.SaveToDatabaseComicsSeason(idcomic,this.imgPath,numero,res.metadata,descricao).then((response) => {
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

  EncerrarComic(){
    let inputAlert = this.AlertCtrl.create({
      title: 'Encerrar/Prosseguir com uma Comic',
      inputs: [
        {
          name: 'valor',
          placeholder: 'True = Encerrar | False = Prosseguir',
        },
        {
          name: 'idcomic',
          placeholder: 'Escreva aqui o id da comic',
          value: this.stringComicId,
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
            this.AbreCarregador()
            this.dataProvider.CloseComicsToDatabase(data.idcomic,data.valor).then(() => {
              let toast = this.toastCtrl.create({
                message: "Seu envio de Enceramento/Prosseguir foi um Sucesso",
                duration: 3000
              });
          
              toast.present();
              this.FechaCarregador();
            }).catch(() =>{
              let toast = this.toastCtrl.create({
                message: "Ocorreu um erro",
                duration: 3000
              });
          
              toast.present();
              this.FechaCarregador();
            })
          
          }
        }
      ]
    });
    inputAlert.present();

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


  AddCreditsComics() {

    let inputAlert = this.AlertCtrl.create({
      title: 'Quer adicionar esse artista aos creditos?',
      inputs: [
    
        {
          name: 'nome',
          placeholder: 'Escreva aqui o nome',
          value: this.artist.nome,
        },
        {
          name: 'funcao',
          placeholder: 'Escreva aqui a função',
          value:this.artist.funcao,
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

            this.UploadCreditsComics(data.nome,data.funcao);
          }
        }
      ]
    });
    inputAlert.present();

  }

  UploadCreditsComics(nome,funcao){

    this.AbreCarregador();

  
      this.dataProvider.SaveToDatabaseCreditsComics(this.keyComic.key,this.artist.foto,nome,funcao).then((response) => {
        let toast = this.toastCtrl.create({
              message: "Seu envio de Creditos foi um Sucesso " + response.key,
              duration: 3000
            });
            toast.present();
          
            
            this.FechaCarregador();
           
           
           
      });
    
  }


  AddArtista() {

    let inputAlert = this.AlertCtrl.create({
      title: 'Add artista',
      inputs: [
    
        {
          name: 'nome',
          placeholder: 'Escreva aqui o nome',
        },
        {
          name: 'funcao',
          placeholder: 'Escreva aqui a função',
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

            this.UploadArtist(data.nome,data.funcao);
          }
        }
      ]
    });
    inputAlert.present();

  }

  UploadArtist(nome,funcao){

    this.AbreCarregador();

    let upload = this.dataProvider.UploadToStoregedCreditsComics(nome,this.imgPath);

    console.log('upload' + upload);

    upload.then().then(res => {
     
      this.dataProvider.SaveToDatabaseArtists(this.imgPath,nome,funcao).then((response) => {
        let toast = this.toastCtrl.create({
              message: "Seu envio de Artista foi um Sucesso " + response.key,
              duration: 3000
            });
            toast.present();
          
            
            this.FechaCarregador();
           
            this.GetArtists();
           
      });
   });
    
  }


//---------------------------------------------------------------LIST

GetRetornarComics() {

  this.AbreCarregador();

  this.hqlista = this.dataProvider.GetUser(this.usuario);
  this.hqlista.subscribe(res => {
 
  this.hqsUser = res[1];

  });

  this.auxHq = this.dataProvider.GetAllComics().valueChanges();
  this.auxHq.subscribe(res => {
    
  this.searchHqs = res;

  this.FechaCarregador();
    
  this.GetArtists();
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

GetArtists(){
 
  this.AbreCarregador();
  this.aux = this.dataProvider.GetAllArtists();

  this.aux.subscribe(res =>{
    this.artists = res;
   this.FechaCarregador();
  });
}

SetArtist(credits){
  this.artist = credits;
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




