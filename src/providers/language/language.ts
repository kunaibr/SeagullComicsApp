import { Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/Storage';

const LNG_KEY = 'SELECTED_LANGUAGE';
 
@Injectable()
export class LanguageProvider {
  selected = '';
 
  constructor(
    private translate: TranslateService,
    public http: Http, 
    public storage: Storage
    ) 
  { }
 
  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    console.log(language);
    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        console.log(val);
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }
 
  getLanguages() {
    return [
      { text: 'English', value: 'en', img: 'assets/imgs/en.png' },
      { text: 'Portugues', value: 'pt', img: 'assets/imgs/de.png' },
    ];
  }
 
  setLanguage(lng) {
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set(LNG_KEY, lng);
  }
}