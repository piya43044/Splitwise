import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageErrorComponent } from './page-error/page-error.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PageErrorComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'RequestVerificationToken'
    }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
