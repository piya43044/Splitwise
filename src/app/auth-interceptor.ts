import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService : CookieService ){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the XSRF token from wherever it is stored (e.g., cookie, local storage)
    const xsrfToken =  this.cookieService.get('XSRF-TOKEN');
    
    // Clone the request and add the X-XSRF-TOKEN header
    const updatedRequest = request.clone({
      setHeaders: {
        'RequestVerificationToken': xsrfToken
  
      }
    });

    // Pass the modified request to the next handler
    return next.handle(updatedRequest);
  }
}
