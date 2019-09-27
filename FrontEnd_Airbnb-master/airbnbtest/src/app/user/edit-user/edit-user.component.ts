import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  private user: User;
  private ts: Subscription;

  constructor(private authService: AuthUserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.ts = this.authService.getUserByName(localStorage.getItem('AuthUsername')).subscribe(data => {
      this.user = data;
      console.log(this.user);
    })
  }

}
