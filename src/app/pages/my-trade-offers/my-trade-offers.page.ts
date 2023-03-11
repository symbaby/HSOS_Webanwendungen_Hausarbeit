import {Component, OnInit} from '@angular/core';
import {ITradeWithLinkDTO} from "../../interface/ITradeWithLinkDTO";
import {ApiCallService} from "../../service/api-call.service";
import {Router} from "@angular/router";
import {AddOfferPage} from "../../modal/add-offer/add-offer.page";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-my-trade-offers',
  templateUrl: './my-trade-offers.page.html',
  styleUrls: ['./my-trade-offers.page.scss'],
})
export class MyTradeOffersPage implements OnInit {

  myTradeOffers: ITradeWithLinkDTO[] = [] as ITradeWithLinkDTO[];

  constructor(
    private api: ApiCallService,
    private router: Router,
    private modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.getMyTradeOffers();
  }

  getMyTradeOffers() {
    this.api.getMyTradeOffers().subscribe(data => {
      this.myTradeOffers = data;
    })
  }

  backToMenu() {
    this.router.navigateByUrl("/tabs/tab4", {replaceUrl: true})
  }


  async openModal(): Promise<void>{
    const modal = await this.modalController.create({
      component: AddOfferPage,
      componentProps: {
        text: 'Add offer Modal'
      }
    });
    return await modal.present();
  }
}
