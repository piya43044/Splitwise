import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense-add-edit',
  templateUrl: './expense-add-edit.component.html',
  styleUrls: ['./expense-add-edit.component.scss']
})
export class ExpenseAddEditComponent {

  addExpenseForm !: FormGroup;
  isExpenseAddActive: Boolean = false;
  getActivatedRouteParam : String = '';
  currency: String[] = ['MYR', 'SGD', 'USD'];
  groups: String[] = ['Mathura', 'Vanaras', 'Goa'];

  // Constructor
  constructor( private router: Router, private activatedRoute: ActivatedRoute){};

  // ngOnInit method
  ngOnInit(): void {

    // get activatedRoute parameter using observable
    this.activatedRoute.params.subscribe((param) =>{
      this.getActivatedRouteParam = param['routerParam'];
      console.log(this.getActivatedRouteParam)
      if(this.getActivatedRouteParam === undefined ){
        this.isExpenseAddActive = true;
      }
      else{
        this.isExpenseAddActive = false;
      }
    })
  }
}
