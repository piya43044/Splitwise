import { Component } from '@angular/core';
import { SettleUpService } from '../services/settle-up.service';
import { UserData } from '../models/settleUp.model';

@Component({
  selector: 'app-settle-up',
  templateUrl: './settle-up.component.html',
  styleUrls: ['./settle-up.component.scss']
})
export class SettleUpComponent {
  constructor(private userAmount: SettleUpService) {}
  currency: string[] = ['MYR', 'SGD', 'USD'];
  groups: string[] = ['Mathura', 'Vanaras', 'Goa'];

  ownedDetails: UserData[] = [];
  datas: UserData | undefined;

  unSettle() {
    this.userAmount.getUnsettledList().subscribe((data) => {     
      this.ownedDetails = data;   
      console.log(this.ownedDetails)
      for(let ownedDetail of this.ownedDetails){
      console.log(ownedDetail.ownedBy);
    }
    });
  }
}
