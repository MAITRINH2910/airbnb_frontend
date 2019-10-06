import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './models/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AuthGuardService } from './guard/auth-guard.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { HostComponent } from './host/host/host.component';
import { DashboardComponent } from './host/dashboard/dashboard.component';
import { PropertyComponent } from './host/property/property.component';
import { EditHouseComponent } from './host/edit-house/edit-house.component';
import { ViewHouseComponent } from './host/view-house/view-house.component';
import { AddHouseComponent } from './host/add-house/add-house.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { FooterComponent } from './frame/footer/footer.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { HistoryForRentComponent } from './user/history-for-rent/history-for-rent.component';
import { HistoryRentComponent } from './user/history-rent/history-rent.component';
import { ResultViewComponent } from './user/result-view/result-view.component';
import { HomeEstayComponent } from './Estay/home-estay/home-estay.component';
import { FilterPageComponent } from './Estay/filter-page/filter-page.component';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('430239822953-suuacgpg06trhdk7f53lq6tmupbe0qdg.apps.googleusercontent.com')
  },
   {
     id: FacebookLoginProvider.PROVIDER_ID,
     provider: new FacebookLoginProvider('363164397686322')
   },
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    HostComponent,
    DashboardComponent,
    PropertyComponent,
    EditHouseComponent,
    ViewHouseComponent,
    AddHouseComponent,
    HomePageComponent,   
    ChangePasswordComponent,
    EditUserComponent,
    FooterComponent,
    HistoryForRentComponent,
    HistoryRentComponent,
    ResultViewComponent,
    HomeEstayComponent,
    FilterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    SocialLoginModule,
    SlickCarouselModule
  ],

  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    httpInterceptorProviders, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
