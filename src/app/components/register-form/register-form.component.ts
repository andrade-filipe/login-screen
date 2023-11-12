import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender } from 'src/app/enums/gender';
import { ApiService } from 'src/app/service/api/api-request.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
    selectedGender!: string;

    public genders: Array<{ text: string; value: Gender }> = [
        { text: 'Male', value: Gender.MALE },
        { text: 'Female', value: Gender.FEMALE },
        { text: 'Other', value: Gender.OTHER },
    ];

    public birth = new FormControl(new Date().toUTCString(), Validators.required);

    constructor(apiService: ApiService, private router: Router) {}

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
        this.router.navigate(['/login']);
        console.log(this.registerForm.value);
    }
}
