import { Component } from '@angular/core';
import { SettleUpService } from '../services/settle-up.service';
import { SettleUserData } from '../models/settleUp.model';
import { OnInit } from '@angular/core'
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-settle-up',
  templateUrl: './settle-up.component.html',
  styleUrls: ['./settle-up.component.scss']
})
export class SettleUpComponent implements OnInit {
  paymentID !: string;
  ownedDetails: SettleUserData[] = [];
  /**
   * constructor
   */
  constructor(private userAmount: SettleUpService,
    private userService: UserService) {
  }

  /**
   * ngOnInit method
   */
  ngOnInit(): void {
    this.unSettle();
  }

  /**
   * Unsettle are used to get unsettle list
   */
  unSettle() {
    this.userAmount.getUnsettledList().subscribe((data) => {
      this.ownedDetails = data;

      for(let i=0;i<this.ownedDetails.length; i++){
        // Get the user detail by their user id
        this.userService.getUserDetail(this.ownedDetails[i].ownedBy).subscribe( data => {
          this.ownedDetails[i].ownedByName = data.userName;
        })
      }
    });
  }

  /**
   * paymentMethod are used to subscribe settle payment
   * @param payID are used to store payment Id
   */
  paymentMethod(payID: string) {
    this.userAmount.settlePayment(payID).subscribe((x) => {
      alert("Payment successful");
      this.unSettle();
    },
    )
  }

  /**
   * getPaymentID are used to take payment Id from the user
   * @param event are used to store payment Id
   */
  getPaymentID(event: string):void {
    this.paymentID = event
    this.paymentMethod(this.paymentID)
  }
}
