import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '@abp/ng.core';
import { User_login } from 'src/app/models/login.model';
import { environment } from 'src/environments/environment';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';


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
  constructor(private router: Router, private loggedUSer: UserService, private authService : AuthService, private oauthService: OAuthService) { };

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
      console.log(x);
    })
  }
 
   /**
   * Submit methos
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


  // submitEmailLogin(): void {

  //   if (this.loginForm.valid) {

  //     // this.loaderService.showLoader();  //Show Loader
  //     const loginModel = this.loginForm.value;

  //     this.authService.login({

  //       username: loginModel.email as string,

  //       password: loginModel.password as string,

  //       rememberMe: true,

  //       redirectUrl: ''

  //     }).subscribe(

  //       {

  //         next: () => {
  //           const loginModel = this.loginForm.value;
  //           console.log('Entered email:', loginModel.email);
  //           console.log('Entered password:', loginModel.password);
  //           // this.loaderService.hideLoader(); //Hide Loader
            
  //           this.router.navigate(['dashboard']);

  //         },

  //         error: (err) => {

  //           // this.loaderService.hideLoader(); //Hide Loader

  //           if (err.status !== undefined && err.status === 400 && err.error !== undefined && err.error.error === 'invalid_grant') {

  //             // this.alertService.error('Invalid username or password!', false);
  //             alert("Invalid userName ")

  //           }

  //           else {

  //             // this.alertService.error('Oops! something went wrong.', false);
  //             alert("Oops! something went wrong")

  //           }

  //         }

  //       });

  //   }

  //   else {

  //     return

  //   }

  // }
}
