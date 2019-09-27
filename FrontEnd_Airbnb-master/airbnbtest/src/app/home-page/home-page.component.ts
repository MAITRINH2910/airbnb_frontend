import { Component, OnInit, Input } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { AuthUserService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  userSocial: SocialUser;
  private roles: string[];
  public authority: string;
  info: any;
  userForService: User;
  private ts: Subscription;
  private name: string;
  private image: string;

  @Input() receiveStatus: boolean;

  constructor(private token: TokenStorageService,
    public router: Router,
    private authService: AuthUserService,
  ) { }

  ngOnInit() {

    if (this.token.getToken()) {
      this.name = this.token.getUsername();
      this.info = {
        token: this.token.getToken(),
        username: this.token.getUsername(),
        authorities: this.token.getAuthorities(),
      };
    } else {
      this.name = this.token.getUsername();
      this.info = {
        token: this.token.getTokenSession(),
        username: this.token.getUsernameSession(),
        authorities: this.token.getAuthoritiesSession()
      };
    }

    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.name = this.token.getUsername();
      this.ts = this.authService.getUserByName(this.name).subscribe(data => {
        this.userForService = data;
        console.log(this.userForService)
      })
      console.log(this.token.getUsername)
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    else {
      this.roles = this.token.getAuthoritiesSession();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  logout() {
    if (this.token.getToken()) {
      this.token.signOut();
      this.router.navigate(['/homepage/auth/login'])
        .then(() => {
          window.location.reload();
        });
    } else {
      this.token.signOut1();
      this.router.navigate(['/homepage/auth/login'])
        .then(() => {
          window.location.reload();
        });
    }
  }
}

