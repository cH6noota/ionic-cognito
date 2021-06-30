import { Component, OnInit } from '@angular/core';
import { CognitoServiceService} from "../cognito-service.service";
import { SignUpPage } from "../sign-up/sign-up.page";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  signUpPage = SignUpPage;
  
  constructor(public CognitoSerive:CognitoServiceService) {
  }

  login(){
    this.CognitoSerive.authenticate(this.email, this.password)
    .then(res =>{
      console.log(res);
    }, err =>{
      console.log(err);
    });
  }


  ngOnInit() {
  }

}
