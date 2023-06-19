import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the XSRF token from wherever it is stored (e.g., cookie, local storage)
    const xsrfToken = 'YOUR_XSRF_TOKEN';

    // Clone the request and add the X-XSRF-TOKEN header
    const updatedRequest = request.clone({
      setHeaders: {
        'X-XSRF-TOKEN': xsrfToken
      }
    });

    // Pass the modified request to the next handler
    return next.handle(updatedRequest);
  }
}
