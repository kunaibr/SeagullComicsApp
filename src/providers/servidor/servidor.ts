
import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ServidorProvider {

  url: string = "http://localhost/SeagullComics/php/";
  
  constructor(public http: Http) {
  }

  PostData(body,file){
    let type = "application/json; charset=UTF-8";
    let headers = new Headers({ 'Content-type': type });
    let options = new RequestOptions({headers: headers});
    console.log('3');

    //ERRO
    return this.http.post(this.url + file,  JSON.stringify(body),options)
    .map(res => res.json());
    
  }

  UrlGet(){
    return this.url;
  }
  
}
