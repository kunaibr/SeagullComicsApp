import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { CadastroPage } from '../cadastro/cadastro';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { HqsPage } from '../hqs/hqs';
import { DatabaseProvider } from '../../providers/database/database';

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
     public database:DatabaseProvider,
     public http: Http,
     public globalvars: GlobalvarsProvider,
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
    this.database.setStorageUser(null);
  }

  PushCadastro(){
    this.navCtrl.push(CadastroPage);
  }

  EfetuarLogin(){
    this.afAuth.auth.signInWithEmailAndPassword(
      this.loginForm.value.email, this.loginForm.value.senha
      ).then((response) =>{
        this.globalvars.setUser(response.user.uid.toString());
         this.database.setStorageUser(response.user.uid.toString());
         
          this.navCtrl.setRoot(HqsPage);
            
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
