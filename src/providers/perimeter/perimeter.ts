import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class PerimeterProvider {
  
  private url:string = "http://127.0.0.1:8000/api/v1/";

  private url2:string = "";

  constructor(private http: HttpClient) {
   
  }

  getPerimetro( gender ){
    if(gender == 'masculino'){
      this.url2 = "perimetrob_m";
    }
    if(gender == 'femenino'){
      this.url2 = "perimetrob_f";
    }
    return this.http.get(this.url + this.url2)
  }

 


}
