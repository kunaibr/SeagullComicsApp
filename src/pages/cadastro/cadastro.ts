import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateConfirmPassword } from '../../validators/confirmPassword';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  registerForm: FormGroup;

  usuarios: any;

  // nome:String = "";
  // senha:String = "";
  // email:String = "";
  // senhaComfirm:String = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public servidor: ServidorProvider,
    public http: Http,
    public toastCtrl: ToastController,
    public formbuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
  ) {

    this.registerForm = this.formbuilder.group({
      nome: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(5)]],
      senhaConfirm: [null, [Validators.required, Validators.minLength(5), ValidateConfirmPassword]],
    });
  }

  EfetuarCadastro() {


    this.afAuth.auth.createUserWithEmailAndPassword(
      this.registerForm.value.email,
      this.registerForm.value.senha
    ).then((response) => {
      
      this.db.database.ref('/usuarios').child(response.user.uid).push({
        nome: this.registerForm.value.nome,
        status: 'Ativo',
        desconto: '',
      })
        .then(() => {

          this.navCtrl.pop();
          this.Toast("Conta criada com sucesso!");
        })
        .catch((error) => {
          console.log(error);
        });

    })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.Toast("Esse e-mail já foi cadastrado");
            break;
          case 'auth/invalid-email':
            this.Toast("Esse e-mail é invalido");
            break;
          case 'auth/weak-password':
            this.Toast("Essa senha é muito fraca");
            break;
        }
      });

  }

  Toast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
    })

    toast.present();
  }

  VoltarPage() {
    this.navCtrl.pop();
  }
}
