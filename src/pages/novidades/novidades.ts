import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { DetalheNoticiaPage } from '../detalhe-noticia/detalhe-noticia';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { Storage } from '@ionic/Storage';


/**
 * Generated class for the NovidadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-novidades',
  templateUrl: 'novidades.html',
})

export class NovidadesPage {

  @ViewChild(Slides) slides: Slides;

  imageSlide: string = "https://gabrielkunaibr.000webhostapp.com/WhatsApp%20Image%202019-02-02%20at%2017.45.54.jpeg";

  public noticias:any;

  public slidesnew:any;
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public servidor: ServidorProvider, 
    public http: Http,
    public globalvars: GlobalvarsProvider,
    public storage: Storage,
    ) {

    this.getRetornarNoticia();
    this.getRetornarSlides();
  }

  //Coleta os dados do bd na tabela noticia pelo noticias.php e coloca em uma array
  getRetornarNoticia(){
    this.http.get(this.servidor.UrlGet()+'noticias.php').pipe(map(res => res.json()))
    .subscribe( 
      data => this.noticias = data,
      err => console.log(err)
      );
  }

  //Coleta os dados do bd na tabela slide pelo slides.php e coloca em uma array
  getRetornarSlides(){
    this.http.get(this.servidor.UrlGet()+'slides.php').pipe(map(res => res.json()))
    .subscribe( 
      data => this.slidesnew = data,
      err => console.log(err)
      );
  }


  ionViewDidEnter() {
    this.storage.get('session_storage').then((res) => {
        this.globalvars.setUser(res);
    });
   this.goToSlide();
  }

  slideChanged() {
   this.goToSlide();
  }


  //aqui é a passagem automatico dos slides 
  goToSlide() {
    //Demora de 5 seg para passar de slide e 0,5 de transição
      setTimeout( () => {

        if(this.slides.isEnd())
        {   
          this.slides.slideTo(0,500,true);
        }else{
          this.slides.slideNext(500,true);
        }

      }, 5000);
   }
  

   openDetails(noticia:any){
    this.navCtrl.push(DetalheNoticiaPage, {cod: noticia});
   }
}
