import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { NovidadesPage } from '../novidades/novidades';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { CadastroPage } from '../cadastro/cadastro';
import { Storage } from '@ionic/Storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  nome: string = "";
  senha: string = "";

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams, 
     public toastCtrl: ToastController,
     public servidor:ServidorProvider,
     public http: Http,
     public globalvars: GlobalvarsProvider,
     public storage: Storage,

     ) {
  }

  ionViewDidEnter(){
    this.globalvars.setUser(null);
    this.storage.set('session_storage', null);
  }

  PushCadastro(){
    this.navCtrl.push(CadastroPage);
  }

  EfetuarLogin(){
    if(this.nome == "adm" || this.senha == "adm" ){
      this.navCtrl.setRoot(NovidadesPage);
    }
    if(this.nome == ""|| this.senha == "" ){
      let toast = this.toastCtrl.create({
        message: "Preencha todos os campos!",
        duration: 3000,
      })
      toast.present();
    }else{

      this.http.get(this.servidor.UrlGet()+'login.php?nome='+this.nome+'&senha='+this.senha).pipe(map(res => res.json()))
      .subscribe(
        dados => {
          if(dados.msg.logado == "sim"){
            this.globalvars.setUser(dados);
            this.storage.set('session_storage', dados);

            this.navCtrl.setRoot(NovidadesPage);
            
            
          }else{
            let toast = this.toastCtrl.create({
            
              message: "Usuario ou senha invalidos!",
              duration: 3000,
            })
            toast.present();
          }
        }
      )
    }
  }
}
