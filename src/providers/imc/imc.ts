import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ImcProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImcProvider {

  private url:string = "http://stepupenglish.com.mx/edunovac/api/v1/";
  private url2:string = "";

  constructor(private http: HttpClient) {
  }

  getIMC( gender ){
    if(gender == 'masculino'){
      this.url2 = "imc_m";
    }
    if(gender == 'femenino'){
      this.url2 = "imc_f";
    }
    return this.http.get(this.url + this.url2);
  }


}
