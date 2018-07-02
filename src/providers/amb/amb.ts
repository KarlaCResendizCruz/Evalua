import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AmbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AmbProvider {

  private url:string = "http://127.0.0.1:8000/api/v1/";

  private url2:string = "";

  constructor(private http: HttpClient) {
   
  }

  getAMB( gender ){
    if(gender == 'masculino'){
      this.url2 = "amb_m";
    }
    if(gender == 'femenino'){
      this.url2 = "amb_f";
    }
    return this.http.get(this.url + this.url2)
  }


}
