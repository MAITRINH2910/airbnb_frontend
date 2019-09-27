import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (control.value !== matchingControl.value) {
      console.log(matchingControl);
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  board: string;
  message: any;
  newPass: string;
  oldPass: string;

  passWord: Array<string> = [this.newPass, this.oldPass];
  idUser: number;
  formEditPass: FormGroup;
  submitted = false;
  isSubmitFailed = false;
  constructor(private authService: AuthUserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.editForm();
  }
  h: number;
  keyDownPassword(event) {
    this.h = event.keyCode;
    if (this.h === 32) {
      event.preventDefault();
    }
  }

  editForm() {
    this.formEditPass = this.formBuilder.group({
      oldPass: ['', [
        Validators.required,
      ]],
      newPass: ['', [
        Validators.required,
      ]],
      confirmPassword: ['', [
        Validators.required,
      ]],
    },
      {
        validator: MustMatch('newPass', 'confirmPassword')
      });

  }
  onSubmitForm() {
    this.submitted = true;
    this.authService.getUser().subscribe(data => {
      const idUser = data.id;
      this.authService.updatePassword(idUser, this.formEditPass.value.newPass, this.formEditPass.value.oldPass).subscribe(
        data => { this.message = 'Bạn đã đổi password thành công!' },
        error => { this.message = error.error.message }
      );


    }
    );
  }

}