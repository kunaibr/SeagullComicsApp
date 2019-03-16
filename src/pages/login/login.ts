import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { NovidadesPage } from '../novidades/novidades';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  nome: string;
  senha: string;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams, 
     public alertCtrl: AlertController,
     public servidor:ServidorProvider,
     public http: Http,
     public globalvars: GlobalvarsProvider,
     
     ) {
  }

  ionViewDidLoad() {
   

  }

  EfetuarLogin(){
    if(this.nome == undefined || this.senha == undefined){
      let alert = this.alertCtrl.create({
        title: "Atenção",
        message: "Preencha todos os campos!",
        buttons: ["OK"],
      })
      alert.present();
    }else{

      this.http.get(this.servidor.UrlGet()+'login.php?nome='+this.nome+'&senha='+this.senha).pipe(map(res => res.json()))
      .subscribe(
        dados => {
          if(dados.msg.logado == "sim"){
            this.globalvars.setUser(dados);
            this.navCtrl.setRoot(NovidadesPage);
          }else{
            let alert = this.alertCtrl.create({
              title: "Atenção",
              message: "Usuario ou senha invalidos!",
              buttons: ["OK"],
            })
            alert.present();
          }
        }
      )
    }
  }
}
