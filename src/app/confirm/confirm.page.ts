import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoServiceService} from "../cognito-service.service";
import { NavController, NavParams, AlertController } from "@ionic/angular";

import { SignUpPage} from "../sign-up/sign-up.page";
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage {
  code : string;
  constructor(
    public alertController: AlertController,
    public router: Router,
    public CognitoService: CognitoServiceService,
  ) { }

  func(){
    const mail = localStorage.getItem('mail');
    console.log(this.code);
    this.verifyUser(String(this.code), mail);
  }

  verifyUser(verificationCode ,mail) {
    this.CognitoService.confirmUser(verificationCode, mail).then(
      res => {
        console.log(res);
        this.auth_verify();
        this.router.navigateByUrl('/login');
      },
      err => {
        alert(err.message);
      }
    );
  }

  async auth_verify() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '認証されました',
      buttons: ['OK']
    });

    await alert.present();
  }

}
