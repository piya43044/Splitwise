import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  // ngOnInit method
  ngOnInit(): void{
    this.registerForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email : new FormControl('', [Validators.required , Validators.email]),
        password : new FormControl('',
                          [Validators.required, 
                            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
                            Validators.minLength(8)
                          ])
    })
  }

  // getter methods
  get name(){
    return this.registerForm.get('name');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get password(){
    return this.registerForm.get('password');
  }

  // Form submit method
  onSubmit(): void{
    this.registerForm.reset();
  }
}
