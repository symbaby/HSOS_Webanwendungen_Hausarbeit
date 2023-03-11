import {Component} from '@angular/core';
import {ApiCallService} from "../service/api-call.service";
import {IPrincipalDTO} from "../interface/IPrincipalDTO";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  principal: IPrincipalDTO = {} as IPrincipalDTO;

  constructor(private api: ApiCallService) {
    this.loadPrincipal();
  }

  loadPrincipal(): void {
    this.api.whoAmI().subscribe(data => {
      this.principal = data;
    });
  }

}
