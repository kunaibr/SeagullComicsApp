import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { NovidadesPage } from '../novidades/novidades';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { CadastroPage } from '../cadastro/cadastro';
import { Storage } from '@ionic/Storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams, 
     public toastCtrl: ToastController,
     public servidor:ServidorProvider,
     public http: Http,
     public globalvars: GlobalvarsProvider,
     public storage: Storage,
     public formBuilder: FormBuilder,
     public afAuth: AngularFireAuth,
     ) {
       this.loginForm = formBuilder.group({
        email: [null,[Validators.required, Validators.email]],
        senha: [null, [Validators.required, Validators.minLength(6)]],
       });
  }

  ionViewDidEnter(){
    this.globalvars.setUser(null);
    this.storage.set('user', null);
  }

  PushCadastro(){
    this.navCtrl.push(CadastroPage);
  }

  EfetuarLogin(){
    this.afAuth.auth.signInWithEmailAndPassword(
      this.loginForm.value.email, this.loginForm.value.senha
      ).then((response) =>{
          this.globalvars.setUser(response.user.uid.toString());
          this.storage.set('user', response.user.uid.toString())
          .then(() => {
            this.navCtrl.setRoot(NovidadesPage);
            
          });
      }).catch((error) =>{
        
        switch (error.code){
          case 'auth/user-not-found':
          this.Toast("Usuario não cadastrado");
          break;
          case 'auth/wrong-password':
          this.Toast("Senha invalida");
          this.loginForm.controls['senha'].setValue(null);
          break;
      }
      }
      );
  }

  Toast(text: string){
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
    })

    toast.present();
  }
}
