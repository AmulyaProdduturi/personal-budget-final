import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
//import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'pb-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public userData = [];
  username:string
  password:string
  isUserLoggedIn = new Subject<boolean>();

  constructor(private router: Router,public _dataService: DataService) {
    this.isUserLoggedIn.next(false);      
   }

  ngOnInit(): void {
  }

  signupFunction(){
    this.router.navigate(['/signup'])
  }

  //loginFunction(){
    //this.router.navigate(['/homepage'])
  //}
  enterAllDetails(){
    //this.toastr.warning('Please enter all the details','Warning');
  }
  loginSuccessful(){
    //this.toastr.success('Logged In','Success');
  }

  loginFailure(){
    //this.toastr.error('Invalid Credentials. Please enter valid credentials','Failure');
  }
  loginFunction(){
    let record = {};
    record['username'] = this.username;
    record['password'] = this.password;
    console.log(JSON.stringify(record));
    
    if(!this.username || !this.password){
      console.log("UserName or password is missing");
      //this.enterAllDetails();
    }else{
      this._dataService.userLogin(record);
    }
  }

}
