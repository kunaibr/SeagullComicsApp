import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    public servidor:ServidorProvider,
    public http: Http,
    public toastCtrl: ToastController,
    ) {
      
  }

  EfetuarCadastro(){  
    if(this.nome == "" || 
      this.senha == "" || 
      this.email == "" || 
      this.senhaComfirm == ""){
       
          let toast = this.toastCtrl.create({
            message: "Preencha todos os campos!",
            duration: 3000,
          })

          toast.present();
      
    }else if(this.senhaComfirm != this.senha){
     
      let toast = this.toastCtrl.create({
        message: "As duas senhas não são iguais!",
        duration: 3000,
      })

      toast.present();
    }else{
      let body ={
        nome: this.nome,
        email: this.email,
        senha: this.senha, 
        aksi: 'add_register',
      };
      console.log('1');
      //ERRO
      this.servidor.PostData(body,'register.php').subscribe((data) =>{
         var alertpesan = data.msg;
         console.log('4');
         if(data.sucess){
           console.log('2');
           this.navCtrl.pop();         

           let toast = this.toastCtrl.create({
            message: "Conta criada com sucesso!",
            duration: 3000,
          })
    
          toast.present();
          }else{
            let toast = this.toastCtrl.create({
              message: alertpesan,
              duration: 3000,
            })
      
            toast.present();
          }
      });   
    }
    
    
  }

  VoltarPage(){
    this.navCtrl.pop(); 
  }
}
