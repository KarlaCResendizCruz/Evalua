import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class WeightProvider {

  private url:string = "http://stepupenglish.com.mx/edunovac/api/v1/";
  private url2:string = " ";

  constructor(private http: HttpClient) {
   
  }

  getWeight( gender ){
    if(gender == 'masculino'){
      this.url2 = "peso_m";
    }
    if(gender == 'femenino'){
      this.url2 = "peso_f";
    }
    return this.http.get(this.url + this.url2);
  }


}
