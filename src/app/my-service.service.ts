import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'; 
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

private getOtp="http://apps.thinkoverit.com/api/getOTP.php";

  constructor(private http:HttpClient) { }
temp:any
  getOtpM(data:any){
  return this.http.post(this.getOtp,data)
}


getOtpRes(data:any):Observable<HttpResponse<any>>{
  return this.http.post(this.getOtp,data,{
    observe:'response'
  })
}
}
