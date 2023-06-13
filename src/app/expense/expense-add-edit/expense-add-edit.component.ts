import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private groupService: GroupService){};

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
    })

    this.getGroupList();

    // Add expense form
    this.addExpenseForm = new FormGroup({
      groupId: new FormControl('', [Validators.required]),
      paidBy: new FormControl('3a0ba857-0e7a-6933-4800-cf7093d491c1',[Validators.required]),
      expense_title: new FormControl('',[Validators.required]),
      expense_description: new FormControl(''),
      expense_amount: new FormControl('',[Validators.required]),
      split_as: new FormControl('equal',[Validators.required]),
      currency: new FormControl('INR',[Validators.required]),
      isSettled: new FormControl('false',[Validators.required]),
    })

  }

  /**
   * Getter method for expense title
   * @returns FormControl
   */
  get expenseTitle(){
    return this.addExpenseForm.get('expense_title');
  }

  /**
   * Getter method for expense amount
   * @returns FormControl
   */
  get expenseAmount(){
    return this.addExpenseForm.get('expense_amount');
  }

  /**
   * onSubmit method
   * @return void
   */
  onSubmit(): void{
    
    // Post the expense to the api
    this.expenseService.postExpense(this.addExpenseForm.value).subscribe((response) => {
      this.addExpenseForm.reset();
      alert("Expense is added");
      this.router.navigate(['expense/expense-list']);
    })
  }

  /**
   * Get group list from the group api
   * @returns void
   */
  getGroupList(): void {
    this.groupService.getGroupList().subscribe( data => {
      this.group = data;
      this.groupItem = this.group.items;
    })
  }

  /**
   * Get expense detail by their id and set the values in the form
   * @returns void
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
        isSettled: expenseDetail.isSettled,
      })
    })
  }

  /**
   * Update the expense detail by their expense id
   * @returns void
   */
  updateExpense(): void{
    
    this.expenseService.updateExpenseByID(this.getActivatedRouteParam, this.addExpenseForm.value).subscribe( data => {
      this.router.navigate(['expense/expense-list'])
    })
  }
}
