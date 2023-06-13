import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/models/register.model';
import { UserService } from 'src/app/services/user.service';

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
  constructor(private addUsers: UserService, private router: Router) { };

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
   * @retun name
   *  */
  get name() {
    return this.registerForm.get('name');
  }

  /**
   * email method are used to get email
   * @retun email
   *  */
  get email() {
    return this.registerForm.get('email');
  }

  /**
   * password method are used to get password
   * @retun password
   *  */
  get password() {
    return this.registerForm.get('password');
  }

  /**
   * addUser method are used to subscribe data
   * @param new_user : UserRegister
   *  */
  addUser(newUser: UserRegister) {
    this.addUsers.addUsers(newUser).subscribe(
      () => {
        alert("Registration Succesful");
        this.router.navigate(['/login']);
      },
      // HttpErrorResponse
      // @param error : HttpErrorResponse
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          alert("User already exists");
        }
        else if (error.status === 401) {
          alert("Unauthorized");
        }
        else if (error.status === 400) {
          alert("Badrequest");
        }
        else if (error.status === 404) {
          alert("Not Found");
        }
        else if (error.status === 500) {
          alert("Server error");
        }
        else if (error.status === 501) {
          alert("Server error");
        }
      }
    );
  }

  /**
   * Submit method
   * */
  onSubmit(): void {
    const formData = this.registerForm.value;
    const newUser: UserRegister = {
      userName: formData.name,
      emailAddress: formData.email,
      password: formData.password,
      appName: 'Splitwise',
    }
    //call add user method
    //@param newUser : UserRegister
    this.addUser(newUser);
    this.registerForm.reset();
  }
}
