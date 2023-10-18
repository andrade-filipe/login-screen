import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  selectedGender !: string;

  public genders: Array<{ text: string; value: string }> = [
    { text: "Male", value: "MALE" },
    { text: "Female", value: "FEMALE" },
    { text: "Other", value: "OTHER" },
  ];

  public birth = new FormControl(new Date(), Validators.required);

  constructor(loginService: LoginService) {
  }

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    genderSelect: new FormControl(),
    birthday: this.birth,
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.registerForm.controls.genderSelect.setValue(this.selectedGender);
    console.log(this.registerForm.value);
  }
}
