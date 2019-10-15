
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GlobalvarsProvider {
  
  public usuario:any;
  public email:any;
  public nome:any;

  public statusPagSeg: boolean = false;
  constructor(public http: Http) {}


  setUser(user:any){
    this.usuario = user;

  }

  getUser(){
    return this.usuario;
  }


  setStatusScript(status:boolean){
    this.statusPagSeg = status;
  }

  getStatusScript(){
    return this.statusPagSeg;
  }
}
