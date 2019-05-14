import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateConfirmPassword } from '../../validators/confirmPassword';

import { AngularFireAuth } from '@angular/fire/auth';


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
    public servidor:ServidorProvider,
    public http: Http,
    public toastCtrl: ToastController,
    public formbuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    ) {

      this.registerForm = this.formbuilder.group({
        nome: [null,[Validators.required, Validators.minLength(5)]],
        email: [null,[Validators.required, Validators.email]],
        senha: [null,[Validators.required, Validators.minLength(5)]],
        senhaConfirm: [null,[Validators.required, Validators.minLength(5), ValidateConfirmPassword]],
      });
  }

  EfetuarCadastro(){  


    this.afAuth.auth.createUserWithEmailAndPassword(
      this.registerForm.value.email, 
      this.registerForm.value.senha
      ).then((response) => {

      this.navCtrl.pop();  
      this.Toast();
      })
      .catch((error) => {
        console.log("Deu Erro!",error);
      });

    //Antigo
    // if(this.nome == "" || 
    //   this.senha == "" || 
    //   this.email == "" || 
    //   this.senhaComfirm == ""){
       
    //       let toast = this.toastCtrl.create({
    //         message: "Preencha todos os campos!",
    //         duration: 3000,
    //       })

    //       toast.present();
      
    // }else if(this.senhaComfirm != this.senha){
     
    //   let toast = this.toastCtrl.create({
    //     message: "As duas senhas não são iguais!",
    //     duration: 3000,
    //   })
    //   toast.present();

    // }else{
    //   let body ={
    //     nome: this.nome,
    //     email: this.email,
    //     senha: this.senha, 
    //     aksi: 'add_register',
    //   };
   
    //   //ERRO
    //   this.servidor.PostData(body,'register.php').subscribe((data) =>{

    //      var alertpesan = data.msg;
        
         
    //      if(data.sucess){
           
    //        this.navCtrl.pop();         

    //        let toast = this.toastCtrl.create({
    //         message: "Conta criada com sucesso!",
    //         duration: 3000,
    //       })
    
    //       toast.present();
    //       }else{
    //         let toast = this.toastCtrl.create({
    //           message: alertpesan,
    //           duration: 3000,
    //         })
      
    //         toast.present();
    //       }
    //   });   
    // }
    
    
  }

  Toast(){
    let toast = this.toastCtrl.create({
      message: "Conta criada com sucesso!",
      duration: 3000,
    })

    toast.present();
  }

  VoltarPage(){
    this.navCtrl.pop(); 
  }
}
