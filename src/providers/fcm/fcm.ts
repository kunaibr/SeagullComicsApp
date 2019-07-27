import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/firestore'
//import { Firebase } from '@ionic-native/firebase';


@Injectable()
export class FcmProvider {

  constructor(
    public http: HttpClient,
    public afs: AngularFirestore,
    //public firebaseNative: Firebase,
    ) {


  }

// async getToken(){
//   let token;

//   token = await this.firebaseNative.getToken();

//   return this.saveTokenToFirestore(token);
// }  

// private saveTokenToFirestore(token){
// if(!token) return;

// const devicesRef = this.afs.collection('devices');

// const docData = {
//   token,
//   userId: 'testUser',
// }

// return devicesRef.doc(token).set(docData);
// }

// listenToNotifications(){
//   return this.firebaseNative.onNotificationOpen();
// }
}
