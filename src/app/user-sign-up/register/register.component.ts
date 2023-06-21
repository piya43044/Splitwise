import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/models/register.model';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  /**
   * Constructor
   */
  constructor(private addUsers: UserService, private router: Router ,private toastr: ToastrService) { };

  /**
   * ngOnInit method
   */
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',
        [Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        Validators.minLength(8)
        ])
    })
  }

  /**
   * name method are used to get name
   * @retun formcontrol name
   */
  get name() {
    return this.registerForm.get('name');
  }

  /**
   * email method are used to get email
   * @retun formcontrol email
   */
  get email() {
    return this.registerForm.get('email');
  }

  /**
   * password method are used to get password
   * @retun formcontrol password
   */
  get password() {
    return this.registerForm.get('password');
  }

  /**
   * addUser method are used to subscribe data
   * @param newUser store the user data
   *  */
  addUser(newUser: UserRegister) {
    this.addUsers.addUsers(newUser).subscribe(
      () => {
        this.toastr.success('Register successful.');
        this.router.navigate(['/login']);
      },
      // HttpErrorResponse
      // @param error store the error status
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.toastr.error('Invalid email or password. Please check your credentials and try again.');
        }
        else if (error.status === 403) {
          this.toastr.error('User already exist');
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
    const formData = this.registerForm.value;
    const newUser: UserRegister = {
      userName: formData.name,
      emailAddress: formData.email,
      password: formData.password,
      appName: 'Splitwise',
    }
    //addUser method are used to subscribe data
    //@param newUser store the user data
    this.addUser(newUser);
    this.registerForm.reset();
  }
}
