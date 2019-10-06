import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { House } from '../../models/house.model';
import { HouseService } from '../../services/house.service';

@Component({
  selector: 'app-home-estay',
  templateUrl: './home-estay.component.html',
  styleUrls: ['./home-estay.component.css']
})
export class HomeEstayComponent implements OnInit {
  info: any;
  userForService: User;
  public authority: string;
  private sub: Subscription;
  public houses: House[];
  constructor(
    public router: Router, private houseService: HouseService

  ) { }

  ngOnInit() { 
    this.sub = this.houseService.getAllHouses().subscribe((data: House[]) => {
      this.houses = data;
      this.slides = this.chunk(this.houses, 1);
      console.log(this.slides);

    })
  }

  title = 'ngSlick'; slides: any = [[]];

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  slideConfig = {
    "slidesToShow": 5,
    "slidesToScroll": 1,
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
