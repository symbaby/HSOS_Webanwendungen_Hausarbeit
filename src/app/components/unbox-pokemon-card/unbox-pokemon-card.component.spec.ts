import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnboxPokemonCardComponent } from './unbox-pokemon-card.component';

describe('UnboxPokemonCardComponent', () => {
  let component: UnboxPokemonCardComponent;
  let fixture: ComponentFixture<UnboxPokemonCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UnboxPokemonCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnboxPokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
