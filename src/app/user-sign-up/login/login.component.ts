import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserLogin } from 'src/app/models/login.model';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  /**
   * Constructor
   */
  constructor(private router: Router, private loggedUSer: UserService, private cookieService: CookieService,private toastr: ToastrService) { }

  /**
   * ngOnInit method
   * @returns void
   */
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]),
    })
  }

  /**
    * email method are used to get email
    * @retun formcontrol email
    */
  get email() {
    return this.loginForm.get('email');
  }

  /**
   * password method are used to get password
   * @retun formcontrol password
   */
  get password() {
    return this.loginForm.get('password');
  }

  /**
   * login method are used to subscribe data
   * @param existingUser store the data of the user credential
   *  */
  userLogin(existingUser: UserLogin)  {
    this.loggedUSer.login(existingUser).subscribe(
      (response) => {
        if (response.body?.description === "Success") {
          this.toastr.success('Login successful.');
          this.router.navigate(['dashboard']);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.toastr.error('Invalid email or password. Please check your credentials and try again.');
        }
        else if (error.status === 401) {
          this.toastr.error('Unauthorized. Please check your email and password.');
        }
        else if (error.status === 404) {
          this.toastr.error('Resource not found. Please try again.');
        }
        else if (error.status === 500) {
          this.toastr.error('Server error. Please try again later.');
        }
        else if (error.status === 501) {
          this.toastr.error('Server error. Please try again later.');
        }
      }
    );
  }
  
  /**
  * Submit method
  */
  onSubmit(): void {
    const formData = this.loginForm.value;
    const user: UserLogin = {
      userNameOrEmailAddress: formData.email,
      password: formData.password,
      rememberMe: true,
    }
    this.loginForm.reset();
    //userLogin method are used to subscribe data
    //@param user store the user credentail data
    this.userLogin(user);
  }
}
