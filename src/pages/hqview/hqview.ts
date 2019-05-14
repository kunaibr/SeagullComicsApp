import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServidorProvider } from '../../providers/servidor/servidor';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-hqview',
  templateUrl: 'hqview.html',
})
export class HqviewPage {
  public codigo;
  pages:any[];
  hqs:any[];
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public servidor: ServidorProvider,
     public http: Http,
     ) {
  }

  ionViewDidEnter() {
    this.codigo = this.navParams.get("cod");
    this.GetPages();
  }

  GetPages() {
    this.http.get(this.servidor.UrlGet() + 'pages.php').pipe(map(res => res.json()))
      .subscribe(
        data => {
          this.hqs = data;

          let ind = 0;

          for(let i:number=0;i < this.hqs.length ;i++)
                {
                  if(this.hqs[i].edicao == this.codigo ){
                    this.pages[i-ind] = this.hqs[i];
                  }
                  else
                  {
                      ind++;
                  }
                  
                }
        },
        err => {
          console.log(err);
        }
      );
 
}
}
