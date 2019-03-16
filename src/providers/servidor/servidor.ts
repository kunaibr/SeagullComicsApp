
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the ServidorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServidorProvider {

  url: string = "http://localhost/SeagullComics/php/"
  
  constructor(public http: Http) {
  }

  UrlGet(){
    return this.url;
  }
  
}
