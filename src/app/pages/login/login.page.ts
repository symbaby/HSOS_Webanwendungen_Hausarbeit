import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ApiCallService} from "../../service/api-call.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  async login(): Promise<void> {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        await this.router.navigateByUrl('/tabs', {replaceUrl: true});
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.error,
          buttons: ['OK']
        });

        await alert.present();
      }
    );
  }

  register(){
    this.router.navigateByUrl('/register',{replaceUrl: true})
  }


  get username() {
    return this.credentials.get('username');
  }

  get password() {
    return this.credentials.get('password');
  }

}
