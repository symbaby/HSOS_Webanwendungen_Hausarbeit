import {Component, ElementRef, OnInit} from '@angular/core';
import VanillaTilt from "vanilla-tilt";
import {ModalController} from '@ionic/angular';
import {ApiCallService} from "../../service/api-call.service";
import {ModalPageShopPage} from "../../modal/shop-modal/modal-page-shop.page";
import {IBoosterPackDTO} from "../../interface/IBoosterPackDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-booster-pack',
  templateUrl: './booster-pack.component.html',
  styleUrls: ['./booster-pack.component.scss'],
})
export class BoosterPackComponent implements OnInit {

  boosterPackDTO: IBoosterPackDTO = {} as IBoosterPackDTO;

  constructor(
    private el: ElementRef,
    private modalController: ModalController,
    private api: ApiCallService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // Init VanillaTilt js
    VanillaTilt.init(this.el.nativeElement.querySelectorAll(".ImageHolder"), {
      max: 20,
      speed: 300,
      scale: 1.05,
      glare: true,
      "max-glare": 0.1,
    });

  }

  async openModal(): Promise<void>{
    const modal = await this.modalController.create({
      component: ModalPageShopPage, // The component that will be displayed in the modal
      componentProps: {
        text: 'Buy Modal'
      }
    });
    return await modal.present();
  }

  obtainFree(): void {
    this.api.obtainFreeBooster().subscribe(data => {
      if (!data) {
        alert("You have to wait 1 minute for your next pack");
      } else if (data) {
        this.boosterPackDTO = data;
        this.router.navigate(['/unbox-booster', {boosterPackDTO: JSON.stringify(this.boosterPackDTO)}]);
      }
    });
  }

}
