import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SignUpInfo } from '../models/signup-info';


import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthLoginInfo } from '../models/login-info';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { SignUpFb } from '../models/sign-up-fb';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: SocialUser;
  // newUser: SignUpInfo;
  // newUser = new User();
  newUser = new SignUpFb();
 private loginInfoSocial: AuthLoginInfo;

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  formLogin: FormGroup
  public status = false;
  submitted = false;
  k: number;
  h: number;
  loading = false;

  constructor(
    private router: Router, private authUserService: AuthUserService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }

    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
      console.log(x)
      let emailTemp: string = this.user.email;
      let index = emailTemp.indexOf('@');
      emailTemp = emailTemp.substring(0, index);

      this.newUser.email = this.user.email;
      this.newUser.password = '123456';
      this.newUser.username = emailTemp;
      this.newUser.name = this.user.name;
      this.newUser.role = ['user'];
      this.newUser.providerLogin = this.user.provider;
      this.newUser.image = this.user.photoUrl;

      console.log(this.newUser.email);
      console.log(this.newUser.password);
      console.log(this.newUser.username);
      console.log(this.newUser.name);
      console.log(this.newUser.role);
      console.log(this.newUser.providerLogin);
       //service
       this.authUserService.signUpFb(this.newUser).subscribe();
       this.loginInfoSocial = new AuthLoginInfo(
         this.newUser.username,
         this.newUser.password
         );
 
 
       //log info and go to home
       console.log("Log info")
       console.log(this.newUser.username)
       console.log(this.newUser.password)
       this.authUserService.attemptAuth(this.loginInfoSocial).subscribe(
         data => {
             this.tokenStorage.saveToken(data.accessToken);
             this.tokenStorage.saveUsername(data.username);
             this.tokenStorage.saveAuthorities(data.authorities);
             this.isLoginFailed = false;
             this.isLoggedIn = true;
             this.roles = this.tokenStorage.getAuthorities();
             this.reloadPage();
         },
         error => {
           this.isLoginFailed = true;
           this.loading = false;
           console.log("error")
         }
       );
    }
    );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
      console.log(x)
      let emailTemp: string = this.user.email;
      let index = emailTemp.indexOf('@');
      emailTemp = emailTemp.substring(0, index);

      this.newUser.email = this.user.email;
      this.newUser.password = '123456';
      this.newUser.username = emailTemp;
      this.newUser.name = this.user.name;
      this.newUser.providerLogin = this.user.provider;
      this.newUser.role = ['user'];
      this.newUser.image = this.user.photoUrl;

      console.log(this.newUser.email);
      console.log(this.newUser.password);
      console.log(this.newUser.username);
      console.log(this.newUser.name);
      console.log(this.newUser.providerLogin);

      //service
      this.authUserService.signUpFb(this.newUser).subscribe();
      this.loginInfoSocial = new AuthLoginInfo(
        this.newUser.username,
        this.newUser.password
        );


      //log info and go to home
      console.log("Log info")
      console.log(this.newUser.username)
      console.log(this.newUser.password)
      console.log("LOgin")
      this.authUserService.attemptAuth(this.loginInfoSocial).subscribe(
        data => {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUsername(data.username);
            this.tokenStorage.saveAuthorities(data.authorities);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getAuthorities();
            this.reloadPage();
        },
        error => {
          this.isLoginFailed = true;
          this.loading = false;
          console.log("error")
        }
      );
    }
    );


  }
















  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }

  signOut(): void {
    this.authService.signOut();
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
      password: ['', [Validators.required]],
    });

    //^[a-zA-Z0-9]*$: validate dấu cách,, this.noWhitespaceValidator,
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  keyDownAccount(event) {
    this.k = event.keyCode;
    if ((this.k === 32) || (this.k > 105 && this.k < 112)
      || (this.k >= 186 && this.k <= 192)
      || (this.k === 231) || (this.k >= 220 && this.k <= 222)
    ) {
      event.preventDefault();
    }
  }

  keyDownPassword(event) {
    this.h = event.keyCode;
    if (this.h === 32) {
      event.preventDefault();
    }
  }


  isChecked = true;

  sendStatus() {
    this.isChecked = !this.isChecked;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formLogin.invalid) {
      return;
    }
    this.loading = true;

    this.loginInfo = new AuthLoginInfo(
      this.formLogin.value.username,
      this.formLogin.value.password);
    // this.loginInfo.username = this.loginInfo.username.replace(/\s/g, "");: cắt dấu cách 

    this.authUserService.attemptAuth(this.loginInfo).subscribe(
      data => {
        if (this.isChecked) {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getAuthorities();
          this.reloadPage();
        } else {
          this.tokenStorage.saveTokenSession(data.accessToken);
          this.tokenStorage.saveUsernameSession(data.username);
          this.tokenStorage.saveAuthoritiesSession(data.authorities);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getAuthoritiesSession();
          this.reloadPage();
        }
      },
      error => {
        this.isLoginFailed = true;
        this.loading = false;
      }
    );
  }

  reloadPage() {
    this.router.navigate(['/homepage'])
      .then(() => {
        window.location.reload();
      });
  }
}

