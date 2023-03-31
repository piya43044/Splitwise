import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  ngOnInit(){
    this.loginForm = new FormGroup({
        email : new FormControl('', [Validators.required , Validators.email]),
        password : new FormControl('',[Validators.required])
    })
  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  onSubmit(){
    console.log(this.loginForm);
    this.loginForm.reset();
  }

}
