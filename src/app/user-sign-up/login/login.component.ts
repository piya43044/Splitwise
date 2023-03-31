import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  // ngOnInit method
  ngOnInit(): void{
    this.loginForm = new FormGroup({
        email : new FormControl('', [Validators.required , Validators.email]),
        password : new FormControl('',[Validators.required])
    })
  }

  // getter methods
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  // Form submit method
  onSubmit(): void{
    this.loginForm.reset();
  }

}
