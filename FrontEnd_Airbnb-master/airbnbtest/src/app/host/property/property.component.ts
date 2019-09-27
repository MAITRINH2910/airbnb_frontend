import { Component, OnInit } from '@angular/core';
import { HouseService } from 'src/app/services/house.service';
import { Subscription } from 'rxjs';
import { House } from 'src/app/models/house.model';
import { AuthUserService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  sub: Subscription;
  houses: House[];
  constructor(private houseService: HouseService, private authService: AuthUserService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(data=>{
      let userId = data.id;
      this.sub = this.houseService.getAllHousesByUserId(userId).subscribe((data: House[])=> {
        this.houses = data;
      })
    })
   

  }

  onDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
