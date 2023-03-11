import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {ApiCallService} from "../../service/api-call.service";
import {IBoosterPackDTO} from "../../interface/IBoosterPackDTO";
import {Router} from '@angular/router';


@Component({
  selector: 'app-shop-modal',
  templateUrl: './modal-page-shop.page.html',
  styleUrls: ['./modal-page-shop.page.scss'],
})
export class ModalPageShopPage implements OnInit {

  boosterPackDTO: IBoosterPackDTO = {} as IBoosterPackDTO;

  constructor(
    private modalController: ModalController,
    private api: ApiCallService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  confirmPurchase(): void {
    this.api.buyBooster().subscribe(data => {
      this.boosterPackDTO = data;
      this.dismissModal();
      this.router.navigate(['/unbox-booster', {boosterPackDTO: JSON.stringify(this.boosterPackDTO)}]);
      // window.location.reload();
    })
  }


  dismissModal(): void {
    this.modalController.dismiss();
  }

}
