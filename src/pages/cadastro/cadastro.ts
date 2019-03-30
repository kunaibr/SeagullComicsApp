import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  usuarios: any;

  nome:String = "";
  senha:String = "";
  email:String = "";
  senhaComfirm:String = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public servidor:ServidorProvider,
    public http: Http,
    ) {
      
  }

  ionViewDidLoad() {
  
  }

  EfetuarCadastro(){  
    if(this.nome == undefined || 
      this.senha == undefined || 
      this.email == undefined || 
      this.senhaComfirm == undefined){

      let alert = this.alertCtrl.create({
        title: "Atenção",
        message: "Preencha todos os campos!",
        buttons: ["OK"],
      })
      alert.present();
    }else{

      this.http.get(this.servidor.UrlGet()+'register.php?nome='+this.nome+'&senha='+this.senha+'&email='+this.email+'&senhaComfirm='+this.senhaComfirm).pipe(map(res => res.json()))
      .subscribe(
        dados => {
          if(dados.msg.logado == "sim"){
            
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

  VoltarPage(){
    
  }
}
