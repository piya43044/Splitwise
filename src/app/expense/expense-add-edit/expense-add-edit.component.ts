import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Group } from 'src/app/models/group.model';
import { GroupItem } from 'src/app/models/groupItem.model';
import { ExpenseService } from 'src/app/services/expense.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-expense-add-edit',
  templateUrl: './expense-add-edit.component.html',
  styleUrls: ['./expense-add-edit.component.scss']
})
export class ExpenseAddEditComponent implements OnInit {

  addExpenseForm !: FormGroup;
  isExpenseAddActive: Boolean = false;
  getActivatedRouteParam : string = '';
  group!: Group;
  groupItem!: GroupItem[];

  // Constructor
  constructor( private router: Router, 
    private activatedRoute: ActivatedRoute,
    private expenseService: ExpenseService,
    private groupService: GroupService,
    private toastrService: ToastrService){};

  /**
   * ngOnInit method
   * @return void
   *  */ 
  ngOnInit(): void {

    // get activatedRoute parameter using observable
    this.activatedRoute.params.subscribe((param) =>{
      this.getActivatedRouteParam = param['routerParam'];

      if(this.getActivatedRouteParam === undefined ){
        this.isExpenseAddActive = true;
      }
      else{
        this.isExpenseAddActive = false;
        this.getExpenseById();
      }
    },
    (error) => {
      this.toastrService.error('Error caught, please try again!', '', {
        timeOut: 2000,
      });
    })

    this.getGroupList();

    // Add expense form
    this.addExpenseForm = new FormGroup({
      groupId: new FormControl('', [Validators.required]),
      paidBy: new FormControl('3a0bc563-5c01-4e7b-6d9d-ee5830a71997',[Validators.required]),
      expense_title: new FormControl('',[Validators.required]),
      expense_description: new FormControl(''),
      expense_amount: new FormControl('',[Validators.required]),
      split_as: new FormControl('equal',[Validators.required]),
      currency: new FormControl('INR',[Validators.required]),
    })

  }

  /**
   * Getter method for expense title
   * @returns FormControl of expense title
   */
  get expenseTitle(){
    return this.addExpenseForm.get('expense_title');
  }

  /**
   * Getter method for expense amount
   * @returns FormControl of expense amount
   */
  get expenseAmount(){
    return this.addExpenseForm.get('expense_amount');
  }

  /**
   * onSubmit method
   */
  onSubmit(): void{
    
    // Post the expense to the api
    this.expenseService.postExpense(this.addExpenseForm.value).subscribe((response) => {
      this.addExpenseForm.reset();
      this.toastrService.success('Expense added successfully', '', {
        timeOut: 2000,
      });
      this.router.navigate(['expense/expense-list']);
    },
    (error) => {
      this.toastrService.error('Error caught, please try again!', '', {
        timeOut: 2000,
      });
    })
  }

  /**
   * Get group list from the group api
   */
  getGroupList(): void {
    this.groupService.getGroupList().subscribe( data => {
      this.group = data;
      this.groupItem = this.group.items;
    },
    (error) => {
      this.toastrService.error('Error caught, please try again!', '', {
        timeOut: 2000,
      });
    })
  }

  /**
   * Get expense detail by their id and set the values in the form
   */
  getExpenseById(): void{
    this.expenseService.getExpenseDetailById(this.getActivatedRouteParam).subscribe(data =>{
      const expenseDetail = data;

      // Set the value of the expense form
      this.addExpenseForm.setValue({
        groupId: expenseDetail.groupId,
        paidBy: expenseDetail.paidBy,
        expense_title: expenseDetail.expense_title,
        expense_description: expenseDetail.expense_description,
        expense_amount: expenseDetail.expense_amount,
        split_as: expenseDetail.split_as,
        currency: expenseDetail.currency,
      })
    },
    (error) => {
      this.toastrService.error('Error caught, please try again!', '', {
        timeOut: 2000,
      });
    })
  }

  /**
   * Update the expense detail by their expense id
   */
  updateExpense(): void{
    
    this.expenseService.updateExpenseByID(this.getActivatedRouteParam, this.addExpenseForm.value).subscribe( data => {
      this.toastrService.success('Update successfully', '', {
        timeOut: 2000,
      });
      this.router.navigate(['expense/expense-list'])
    },
    (error) => {
      this.toastrService.error('Error caught, please try again!', '', {
        timeOut: 2000,
      });
    })
  }
}
