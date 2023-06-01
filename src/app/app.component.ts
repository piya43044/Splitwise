import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-splitwise';
  isLoginSignupActive: Boolean = true;
  currentUrl: string = '';
  sideNavStatus: Boolean = false;

  // Constructor
  constructor( private router: Router){};

  // ngOnInit method
  ngOnInit(): void {

    // Get url for checking the login and signup status
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
            this.currentUrl = event.url;
            
            if(this.currentUrl === '/login' || this.currentUrl === '/register' || this.currentUrl === '/'){
              this.isLoginSignupActive = true;
              this.sideNavStatus = false;
            }
            else{
              this.isLoginSignupActive = false;
            }

    });
  }

  // SideNavBar Toogle click
  sideNavToogle(): void{
    this.sideNavStatus =!this.sideNavStatus;
  }
}
