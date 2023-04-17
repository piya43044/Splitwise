import { Component } from '@angular/core';

@Component({
  selector: 'app-settle-up',
  templateUrl: './settle-up.component.html',
  styleUrls: ['./settle-up.component.scss']
})
export class SettleUpComponent {

  currency: String[] = ['MYR', 'SGD', 'USD'];
  groups: String[] = ['Mathura', 'Vanaras', 'Goa'];
}
