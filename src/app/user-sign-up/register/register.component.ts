import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User_register } from 'src/app/models/register.model';
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
  constructor(private add_users : UserService,private router: Router ){};
  /**
   * ngOnInit method
   * @returns void
   */
  ngOnInit(): void{
    this.registerForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email : new FormControl('', [Validators.required ,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        password : new FormControl('',
                          [Validators.required, 
                            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
                            Validators.minLength(8)
                          ])
    })
  }

  /**
   * name method are used to get name
   * @retun formcontrol - name
   *  */
  get name(){
    return this.registerForm.get('name');
  }
  /**
   * email method are used to get email
   * @retun formcontrol - email
   *  */
  get email(){
    return this.registerForm.get('email');
  }
  /**
   * password method are used to get password
   * @retun formcontrol - password
   *  */
  get password(){
    return this.registerForm.get('password');
  }
  /**
   * addUser method are used to subscribe data
   * @param new_user : User_register
   *  */ 
  addUser(new_user: User_register) {
    this.add_users.addUsers(new_user).subscribe(
      (x) => {
        alert("Registration Succesful");
        this.router.navigate(['/login']);
      },
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
   * @returns void
   */
  onSubmit(): void{
    const formData = this.registerForm.value;
    const new_user : User_register ={
     userName : formData.name,
     emailAddress : formData.email,
     password : formData.password,
     appName:'EMS',
   }
   /**
   * call add user method
   * @param new_user : UserRegister
   *  */
    this.addUser(new_user);
    this.registerForm.reset();
  }
}
