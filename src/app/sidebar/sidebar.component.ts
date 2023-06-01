import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() sideNavStatus: Boolean = false;
  currentUrl: string = '/dashboard';

  // Constructor
  constructor( private router: Router){};
  // ngOnInit method
  ngOnInit(): void {

    // Get current url
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
            this.currentUrl = event.url;
    });
  }

}
