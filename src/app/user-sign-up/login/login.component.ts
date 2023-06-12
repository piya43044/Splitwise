import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User_login } from 'src/app/models/login.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '@abp/ng.core/public-api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  /**
   * Constructor
   */
  constructor(private router: Router, private loggedUSer: UserService) { };

  /**
   * ngOnInit method
   * @returns void
   */
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required , Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)])
    })
  }

  /**
   * email method are used to get email
   * @retun email
   *  */
  get email() {
    return this.loginForm.get('email');
  }

  /**
   * password method are used to get password
   * @retun password
   *  */
  get password() {
    return this.loginForm.get('password');
  }
  /**
   * login method are used to subscribe data
   * @param existing_user : User_login
   *  */ 
  login(existing_user: User_login) {
    this.loggedUSer.logUser(existing_user).subscribe(
      (x) => {
        if (x.body.description==="Success") {
          this.getCurrentUser()
          this.router.navigate(['dashboard']);
        } 
        else
        {
          alert('Invalid user name and passwprd');
        }
      },
    )
    }
  /**
   * getCurrentUser method are used to subscribe data
   *  */
  getCurrentUser(){
    this.loggedUSer.currentUser().subscribe((x)=>{
    })
  }
   /**
   * Submit method
   * @returns void
   */
  onSubmit(): void {
    const formData = this.loginForm.value;
    const user: User_login = {
      userNameOrEmailAddress: formData.email,
      password: formData.password,
      rememberMe: true,
    }
    this.loginForm.reset();
    this.login(user)
  }
}
