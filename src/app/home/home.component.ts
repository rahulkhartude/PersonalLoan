import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,FormControl, Validators } from '@angular/forms'; 
import { MyServiceService } from '../my-service.service';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   maxLimitofOTP:number=0;
  myForm:any
  inputvalue="";
  constructor(private fb:FormBuilder,private _myservice:MyServiceService) { }

  ngOnInit(): void {
  this.myForm=this.fb.group({
    fullName:['Rahul Khartude',[Validators.required,Validators.maxLength(140)]],
    email:['rahul@123.com',[Validators.email,Validators.required,Validators.maxLength(255)]],
    panNumber:['',[Validators.required,Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]],
    
    city:['Pune',[Validators.required]],
    mobile:['7875613130',[Validators.required,Validators.pattern("[0-9]{10}")]],
    
    
   
  })


  }

  statusOfRes:boolean=false;
  disableButton=true
  allResponse:HttpResponse<any> | undefined;
  getotpMData:any
  timeleft=3000;
  allData(){
    console.log(this.myForm)
    this._myservice.getOtpM(this.myForm.value).subscribe(val=>{
             this.getotpMData=val;
             console.log(this.getotpMData)
    })
    this._myservice.getOtpRes(this.myForm.value).subscribe((res: HttpResponse<any> | undefined)=>{
       this.allResponse=res
      //  console.log("allResponse: ",this.allResponse)
       if(this.allResponse?.status==200)
       {
         console.log("get otp response is successful")
         this.statusOfRes=true;
         this.maxLimitofOTP++
         console.log(this.maxLimitofOTP)
       }
    })
 
    setTimeout(()=>{ 
      this.disableButton=false;
  }, 3000);  
  


}
  toUpper='ASDFR4563T';
  toUpperCaseM(trans:any){
    this.toUpper=trans.toUpperCase();

  }
  disalbeM(){
    this.disableButton=true;
    setTimeout(()=>{ 
      this.disableButton=false;
  }, 3000);   
  }

  finishTest(){
    this.disableButton=false
   
  }
  tryOneM(e:any){
    if (e["action"] == "done"){
      this.maxLimitofOTP=0;
      console.log("rahul")
      this.statusOfRes=true
      console.log(this.statusOfRes)
    }
  
  
  }
  
  

}
