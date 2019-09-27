import { Component, OnInit, Input } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { AuthUserService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { House } from '../models/house.model';
import { HouseService } from '../services/house.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  userForService: User;
  private ts: Subscription;
  private sub: Subscription;
  private name: string;
  private image: string;
  private roles: string[];
  public authority: string;
  public houses: House[];
  constructor(private token: TokenStorageService,
    public router: Router,
    private authService: AuthUserService,
    private houseService: HouseService
  ) { }

  ngOnInit() {

    if (this.token.getToken()) {
      this.info = {
        token: this.token.getToken(),
        username: this.token.getUsername(),
        authorities: this.token.getAuthorities(),
      };
    } else {
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
        // console.log(this.userForService)
      })
      // console.log(this.token.getUsername)
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

    this.sub = this.houseService.getAllHouses().subscribe((data: House[]) => {
      this.houses = data;
      this.slides = this.chunk(this.houses, 1);
      console.log(this.slides);

    })


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
  // ------------------------------------------------------- //
  title = 'ngSlick'; slides: any = [[]];

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  // slides = [
  //   { img: "https://cdn.luxstay.com/rooms/20465/medium/room_20465_14_1563125198.png" },
  //   { img: "https://cdn.luxstay.com/rooms/20165/medium/room_20165_32_1557367320.jpg" },
  //   { img: "https://cdn.luxstay.com/rooms/20165/medium/room_20165_32_1557367320.jpg" },
  //   { img: "https://cdn.luxstay.com/rooms/20465/medium/room_20465_14_1563125198.png" },
  //   { img: "https://cdn.luxstay.com/rooms/20165/medium/room_20165_32_1557367320.jpg" },
  //   { img: "https://cdn.luxstay.com/rooms/20465/medium/room_20465_14_1563125198.png" },
  //   { img: "https://cdn.luxstay.com/rooms/20165/medium/room_20165_32_1557367320.jpg" },
  //   { img: "https://cdn.luxstay.com/rooms/20465/medium/room_20465_14_1563125198.png" },


  // ];

  slideConfig = {
    "slidesToShow": 5,  
    "slidesToScroll": 1,
    // "nextArrow": "<div class='nav-btn next-slide'></div>",
    // "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": false
  };

  addSlide() {
    this.slides.push({ img: "http://placehold.it/350x150/777777" })
    console.log('slick added');

  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
    console.log('slick s');

  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }




}
