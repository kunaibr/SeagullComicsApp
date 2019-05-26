import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { DatabaseProvider } from '../../providers/database/database';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

 to: string = "seagullcomics.editora@gmail.com";
 title: string = '';
 subject: string = '';
 body: string = '';

 usuario: any;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public emailComposer: EmailComposer,
     private alertCtrl: AlertController,
     private dataProvider:DatabaseProvider,
     private globalvars: GlobalvarsProvider,
     ) {
  }

  ionViewDidLoad() {
    this.dataProvider.GetUser(this.globalvars.getUser()).subscribe(res => {this.usuario = res[0];
      console.log(this.usuario.nome);
    });
   
  }

  PagarBoletoFacil(){
    this.title = 'Assinatura Seagull Comics: ' + this.usuario.nome;
    this.body = 'Eu ' + this.usuario.nome + ' gostaria de comprar a assinatura da Seagull Comics pelo meio do Boleto Facil';
    this.subject = 'Assinatura por Boleto Facil';

    let email = {
      to: this.to,
      cc: [],
      bcc: [],
      attachment:[],
      subject: this.subject,
      body: this.body,
      isHtml: false,
      app: "Gmail",
    }

    this.emailComposer.open(email).then(() => {
      let inputAlert = this.alertCtrl.create({
        title: 'Enviado com Sucesso!',
        subTitle: 'Fique atento ao seu email para mais informações sobre a compra da assinatura!',
        buttons: [
          {
            text: 'OK',
            role: 'Cancel',
          },
        ]
      });
     
      inputAlert.present();

      this.navCtrl.pop();
    });

 

   
  }

  PagarPicPay(){
    this.title = 'Assinatura Seagull Comics: ' + this.usuario.nome;
    this.body = 'Eu ' + this.usuario.nome + ' Gostaria de comprar a assinatura da Seagull Comics pelo meio do PicPay';
    this.subject = 'Assinatura por Picpay';


    let email = {
      to: this.to,
      cc: [],
      bcc: [],
      attachment:[],
      subject: this.subject,
      body: this.body,
      isHtml: false,
      app: "Gmail",
    }

    this.emailComposer.open(email).then(() => {
      let inputAlert = this.alertCtrl.create({
        title: 'Enviado com Sucesso!',
        subTitle: 'Fique atento ao seu email para mais informações sobre a compra da assinatura!',
        buttons: [
          {
            text: 'OK',
            role: 'Cancel',
          },
        ]
      });
     
      inputAlert.present();

      this.navCtrl.pop();
    });

   
  }

  public SendEmail(){
    let email = {
      to: this.to,
      cc: [],
      bcc: [],
      attachment:[],
      subject: this.subject,
      body: this.body,
      isHtml: false,
      app: "Gmail",
    }

    this.emailComposer.open(email);
  }


}
