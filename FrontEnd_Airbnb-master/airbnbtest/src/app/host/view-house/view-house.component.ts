import { Component, OnInit } from '@angular/core';
import { HouseService } from 'src/app/services/house.service';
import { Subscription } from 'rxjs';
import { House } from 'src/app/models/house.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.css']
})
export class ViewHouseComponent implements OnInit {
  sub: Subscription; subParams: Subscription;
  house: any;
  constructor(private houseService: HouseService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.house = new House();
    this.loadData();
  }
  loadData() {
    this.subParams = this.activatedRoute.params.subscribe(data1 => {
      let idHouse = data1.id;
      this.sub = this.houseService.getOneHouse(idHouse).subscribe(data => {
        this.house = data
      })
    })
  }
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  onDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.subParams) {
      this.subParams.unsubscribe();
    }
  }
}
