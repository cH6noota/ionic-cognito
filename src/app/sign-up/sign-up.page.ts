import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoServiceService} from "../cognito-service.service";
import { AlertController } from "@ionic/angular";
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export  class SignUpPage  {

  email: string;
  password: string;

  constructor(
    public alertController: AlertController,
    public router: Router,
    public CognitoService: CognitoServiceService
  ) {}

  async register() {
    this.CognitoService.signUp(this.email, this.password).then(
      res => {
        localStorage.setItem('mail', this.email);  
        this.router.navigateByUrl('/confirm');
      },
      err => {
        console.log(err);
        this.presentAlert(err["message"]);
      }
    );
  }

  async presentAlert(alert_message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'エラーが発生しました',
      message: alert_message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
