import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  // constructor
  constructor(private router:Router){};

  /** 
   * ngOnInit method
   * @returns void
   * */
  ngOnInit(): void{
    this.loginForm = new FormGroup({
        email : new FormControl('', [Validators.required , Validators.email]),
        password : new FormControl('',[Validators.required])
    })
  }

  /** 
   * Getter methods for email
   * @returns FormControl
   * */
  get email(){
    return this.loginForm.get('email');
  }

  /** 
   * Getter methods for password
   * @returns FormControl
   * */
  get password(){
    return this.loginForm.get('password');
  }

  /** 
   * Form submit method
   * @returns void
   * */
  onSubmit(): void{
    this.loginForm.reset();
    this.router.navigate(['dashboard']);
  }

}
