import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SizeProvider {

  private url:string = "http://stepupenglish.com.mx/edunovac/api/v1/";
  private url2:string = "";

  constructor(private http: HttpClient) {
   
  }

  getSize( gender ){
    if(gender == 'masculino'){
      this.url2 = "talla_m";
    }
    if(gender == 'femenino'){
      this.url2 = "talla_f";
    }
    return this.http.get(this.url + this.url2);   
  }


}
