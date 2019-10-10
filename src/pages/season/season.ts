import { Component, Injectable, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController, AlertController } from 'ionic-angular';
import { HqviewPage } from '../hqview/hqview';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';
import { PagamentoPage } from '../pagamento/pagamento';
import { EmailComposer } from '@ionic-native/email-composer';


@IonicPage()
@Component({
  selector: 'page-season',
  templateUrl: 'season.html',
})

@Injectable()
export class SeasonPage {

  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides;

  SwipedTabsIndicator: any = null;

  tabs: any = [];

  hqlista:any;
  hqsUser:string; 
  hqsArrayUser:string[]; 
  usuario:any;
  hqsBiblioteca:any[];
  searchHqs:any[];

  auxHq: Observable<any[]>;
  
  keyComic: any = {
    key: "",
    titulo: "",
    edicao: "",
    imagem: "",
    data: "",
  };

  keySeason: any;

  titulo: string;
  encerrado: string;

  public creditos:any[];

  public isSearchOpen = false;

  public loader;

  public refresher;
  public isRefreshing: boolean = false;

  to: string = "seagullcomics.editora@gmail.com";
  subject: string = "Feedback ";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public servidor: ServidorProvider,
    public http: Http,
    public loadingCtrl: LoadingController,
    public globalvars: GlobalvarsProvider,
    private dataProvider: DatabaseProvider,
    private alertCtrl: AlertController,
    private emailComposer: EmailComposer,
    ) {
      this.tabs = ['Episódios', 'Detalhes'];
      this.usuario = this.globalvars.getUser();

      this.GetRetornarSeason();
      
  }

  

  ionViewDidLoad() {

    this.SwipedTabsIndicator = document.getElementById("indicator");
    this.SwipedTabsSlider.slideTo(this.navParams.get("cod"), 0);
  }

  ngOnDestroy(){
    let inputAlert = this.alertCtrl.create({
      title: 'Dê o seu Feedback!',
      subTitle: 'O que você achou da historia que acabou de ler? Envie sua mensagem',
      inputs: [
        {
          name: 'mensagem',
          placeholder: 'Escreva sua mensagem',
        },
      ],
      buttons: [
      {

          text: 'Cancelar',
          role: 'Cancel',
        },
        {
          text: 'Enviar',
          handler: data => {
            this.SendEmail(data.mensagem);
          }
       },
      ]
    });
   
    inputAlert.present();
  }

  public SendEmail(msg){
    let email = {
      to: this.to,
      cc: [],
      bcc: [],
      attachment:[],
      subject: this.subject + this.titulo,
      body: msg,
      isHtml: false,
      app: "Gmail",
    }

    this.emailComposer.open(email);
  }

//Carrega a pagina
  AbreCarregador() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando",
    });
    this.loader.present();
  }

  FechaCarregador(){
    this.loader.dismiss();
  }

 //Recarrega a pagina
 doRefresh(refresher) {
  this.refresher = refresher;
  this.isRefreshing = true;

  this.GetRetornarSeason();
  }

  
  //Essa função é acionada ao recarregar a page
  GetRetornarSeason() {

    this.keyComic = this.navParams.get("key");
    
    this.titulo = this.keyComic.titulo;

    this.encerrado = this.keyComic.encerrado;

    this.AbreCarregador();

    let aux: any[];

    this.auxHq = this.dataProvider.GetAllSeason(this.keyComic).valueChanges();
    this.auxHq.subscribe(res => {
      aux = res;
      this.isBuy(aux);
     
      
      this.BuscarCreditos();

      this.FechaCarregador();
 
      if (this.isRefreshing) {
        this.refresher.complete();
        
        this.isRefreshing = false;
      }

      this.hqlista = this.dataProvider.GetUser(this.usuario);
      this.hqlista.subscribe(res => {
     
        if(this.titulo == "Estrela fria"){
          this.hqsUser = "Gratis";
        }else{
          this.hqsUser = res[2];
        }

     
    
      });
     
      
    });
  

  }

  isBuy(aux: any[]) {

    this.searchHqs = aux;
    
  }

  OnSearch(ev: any){
    let searchWord = ev.target.value;
   
    if(searchWord && searchWord.trim() != ""){
        this.searchHqs = this.searchHqs.filter((item) =>{
        return (item.titulo.toLowerCase().indexOf(searchWord.toLowerCase()) > -1)
        }) 
       
    }else{
      this.searchHqs = this.hqsBiblioteca;
      return this.searchHqs;
    }

  }

  OpenCompleteSeason(){

    if(this.hqsUser == 'True'){
      console.log("1");
        this.navCtrl.push(HqviewPage, {
          keyComic: this.keyComic,
          keySeason: 'Complete',
          preview: 'False',
        });

     }else{
      
      this.navCtrl.push(HqviewPage, {
        keyComic: this.keyComic,
        keySeason: this.keySeason.key,
        preview: 'True',
      });
     }

  }

  OpenSeason(key):any{

     if(key != undefined && this.hqsUser == 'True'){
    
      this.keySeason = key;
      
        this.navCtrl.push(HqviewPage, {
          keyComic: this.keyComic,
          keySeason:  this.keySeason.key,
          preview: 'False',
        });
     }else{
      this.keySeason = key;
      
      this.navCtrl.push(HqviewPage, {
        keyComic: this.keyComic,
        keySeason:  this.keySeason.key,
        preview: 'True',
      });
     }
  }

  OpenPagamento(){
    this.navCtrl.push(PagamentoPage);
  }

  BuscarCreditos(){
    this.auxHq = this.dataProvider.GetCreditsComics(this.keyComic.key);
    this.auxHq.subscribe(res => {
      this.creditos = res;
    })
  }

  ClickAddBiblioteca(titulo) {
  //  this.dataProvider.AddToBibliotecaComic(titulo,this.usuario).then(res => {
  //    console.log("favoritado!");
  //  });
  }
  

  selectTab(index) {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (100 * index) + '%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
    // A condição não pode ser maior que o index
    if (this.SwipedTabsSlider.length() > this.SwipedTabsSlider.getActiveIndex()) {
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (this.SwipedTabsSlider.getActiveIndex() * 100) + '%,0,0)';
    }

  }
  //Animação do indicador 
  animateIndicator($event) {
    if (this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress * (this.SwipedTabsSlider.length() - 1)) * 100) + '%,0,0)';
  }



}

