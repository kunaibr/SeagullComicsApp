import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';


/**
 * Generated class for the ContatoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})
export class ContatoPage {

  to: string = "seagullcomics.editora@gmail.com";
 title: string = '';
 subject: string = '';
 body: string = '';


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public emailComposer: EmailComposer,
     ) {
     
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
