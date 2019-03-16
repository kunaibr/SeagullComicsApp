
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the GlobalvarsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalvarsProvider {
  
  public usuario:any;

  constructor(public http: Http) {
    console.log('Hello GlobalvarsProvider Provider');
  }

  setUser(user:any){
    this.usuario = user;
  }

  getUser(){
    return this.usuario;
  }

}
