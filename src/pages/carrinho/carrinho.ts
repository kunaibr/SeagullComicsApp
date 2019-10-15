import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PagseguroServiceProvider } from '../../providers/pagseguro-service/pagseguro-service';


@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  constructor(public navCtrl: NavController, private pagseg: PagseguroServiceProvider) {
  this.pagseg.iniciar("seagullcomics.editora@gmail.com", "a4011272-99a8-48e2-a89d-19951e3b7037f75ca248478ab7a5a4d125f6a2659c65f2ba-668d-48f8-a471-7df84997b0a9", true);

  }
  

}
