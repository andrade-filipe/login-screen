import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  public genders: Array<{ text: string; value: number }> = [
    { text: "Male", value: 1 },
    { text: "Female", value: 2 },
    { text: "Other", value: 3 },
  ];

  constructor(loginService: LoginService) {
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    birth: new FormControl(Date, Validators.required),
    gender: new FormControl(), //combobox in the HTML
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),

  });

  onSubmit() {
    console.warn(this.form.value);
  }
}
