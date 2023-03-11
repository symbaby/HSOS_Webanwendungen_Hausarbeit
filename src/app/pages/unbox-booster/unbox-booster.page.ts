import {Component, OnInit} from '@angular/core';
import {IBoosterPackDTO} from "../../interface/IBoosterPackDTO";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";


@Component({
  selector: 'app-unbox-booster',
  templateUrl: './unbox-booster.page.html',
  styleUrls: ['./unbox-booster.page.scss'],
})
export class UnboxBoosterPage implements OnInit {

  boosterPackDTO: IBoosterPackDTO = {} as IBoosterPackDTO;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boosterPackDTO = JSON.parse(params['boosterPackDTO']);
      console.log(this.boosterPackDTO);
    });
  }

  backToMenu(): void {
    this.router.navigateByUrl("/tabs/tab3").then(() => window.location.reload());
  }

}
