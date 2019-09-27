import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { House } from 'src/app/models/house.model';
import { HouseService } from 'src/app/services/house.service';
import { AuthUserService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import * as jwt_decode from 'jwt-decode'

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit {
  sub: Subscription;
  submitted = false;
  loading = false;
  formAddHouse: FormGroup;
  house: House
  utilities = [];
  constructor(private authService: AuthUserService,
    private formBuilder: FormBuilder, private token: TokenStorageService,
    private houseService: HouseService, private routerService: Router
  ) { }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  ngOnInit() {
    this.house = new House();
    this.createForm();
  }
  createForm() {
    this.formAddHouse = this.formBuilder.group({
      title: ['', [Validators.required, this.noWhitespaceValidator]],
      description: [''],
      typeHouse: ['', [Validators.required]],
      typeRoom: ['', [Validators.required]],
      address: ['', [Validators.required, this.noWhitespaceValidator]],
      bedRoomNumber: ['', [Validators.required, Validators.pattern('^[1-9]{1}[0-9]*')]],
      bathRoomNumber: ['', [Validators.required, Validators.pattern('^[1-9]{1}[0-9]*')]],
      pricePerNight: ['', [Validators.required, Validators.pattern('^[1-9]{1}[0-9]{5,11}')]],
      pricePerMonth: ['', [Validators.required, Validators.pattern('^[1-9]{1}[0-9]{5,11}')]],
      // utilities: new FormArray([], minSelectedCheckboxes(1))
    });
    // of(this.getOrders()).subscribe(utilities => {
    //   this.utilities = utilities;
    //   this.addCheckboxes();
    // });
  }
  private addCheckboxes() {
    this.utilities.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.formAddHouse.controls.utilities as FormArray).push(control);
    });
  }

  onSubmit() {
    // const selectedOrderIds = this.formAddHouse.value.utilities
    //   .map((v, i) => v ? this.utilities[i].id : null)
    //   .filter(v => v !== null);
   
    this.submitted = true;
    this.loading = false;
    // if (this.formAddHouse) {
    //   this.loading = false;
    //   return;
    // }
    this.authService.getUser().subscribe(
      user => {
        this.house.user = user;
        this.house.title = this.formAddHouse.value.title;
        this.house.description = this.formAddHouse.value.description;
        this.house.typeHouse = this.formAddHouse.value.typeHouse;
        this.house.typeRoom = this.formAddHouse.value.typeRoom;
        this.house.address = this.formAddHouse.value.address;
        this.house.bedRoomNumber = this.formAddHouse.value.bedRoomNumber;
        this.house.bathRoomNumber = this.formAddHouse.value.bathRoomNumber;
        this.house.pricePerNight = this.formAddHouse.value.pricePerNight;
        this.house.pricePerMonth = this.formAddHouse.value.pricePerMonth;
        console.log(this.house);
        this.sub = this.houseService.addHouse(this.house).subscribe(data => {
          if (data && data.id) {
            this.routerService.navigate(['host/property']);
          }
        })
      }
    )

    console.log(jwt_decode(this.token.getToken()));


  }

  onDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
// function minSelectedCheckboxes(min = 1) {
//   const validator: ValidatorFn = (formArray: FormArray) => {
//     const totalSelected = formArray.controls
//       .map(control => control.value)
//       .reduce((prev, next) => next ? prev + next : prev, 0);

//     return totalSelected >= min ? null : { required: true };
//   };

//   return validator;
// }
