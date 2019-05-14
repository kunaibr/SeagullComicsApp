
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GlobalvarsProvider {
  
  public usuario:any;

  constructor(public http: Http) {

  }

  setUser(user:any){
    this.usuario = user;
  }

  getUser(){
    return this.usuario;
  }



}
