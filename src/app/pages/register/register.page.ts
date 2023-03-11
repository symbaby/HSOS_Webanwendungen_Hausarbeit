import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiCallService} from "../../service/api-call.service";
import {IRegisterTrainerDTO} from "../../interface/IRegisterTrainerDTO";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username!: string;
  password!: string;
  trainer: IRegisterTrainerDTO = {} as IRegisterTrainerDTO;

  constructor(
    private api: ApiCallService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  register() {
    this.api.registerNewUser(this.username, this.password)
      .subscribe(data => {
        this.trainer = data;
      })

    this.router.navigateByUrl("/login", {replaceUrl: true});
  }

}
