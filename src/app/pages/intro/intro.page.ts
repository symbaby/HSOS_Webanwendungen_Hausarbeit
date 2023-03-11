import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from "@ionic/angular";
import {INTRO_KEY} from "../../guards/intro.guard";
import {Router} from "@angular/router";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild(IonSlides) slides!: IonSlides;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  next(): void {
    if (this.slides != undefined) {
      this.slides.slideNext();
    }
  }

  start(): void {
    localStorage.setItem(INTRO_KEY, 'true');
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }
}
