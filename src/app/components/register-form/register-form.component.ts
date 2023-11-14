import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Gender } from 'src/app/enums/gender';
import { RegisterInput } from 'src/app/interfaces/register-input';
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

    public birth = new FormControl(new Date(), Validators.required);

    constructor(private apiService: ApiService, private router: Router) {}

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
        const password = this.registerForm.value.password;
        const confirmationPassword = this.registerForm.value.confirmPassword;

        if (this.confirmPassword(password, confirmationPassword)) {
            this.registerForm.controls.genderSelect.setValue(this.selectedGender);
            let registerInput: RegisterInput = {
                name: this.registerForm.value.name?.valueOf(),
                username: this.registerForm.value.username?.valueOf(),
                email: this.registerForm.value.email?.valueOf(),
                password: this.registerForm.value.password?.valueOf(),
                gender: this.registerForm.value.genderSelect,
                birthDate: this.registerForm.value.birthday,
            };
            this.registerUser(registerInput);
        } else {
            console.error("Couldn't send the register form");
        }
    }

    private confirmPassword(
        password: string | null | undefined,
        confirmationPassword: string | null | undefined
    ): boolean {
        if (
            ((password == '') == null) == undefined ||
            ((confirmationPassword == '') == null) == undefined
        ) {
            return false;
        }
        return password === confirmationPassword;
    }

    private registerUser(registerInput: RegisterInput) {
        this.apiService.registerUserRequest(registerInput).subscribe({
            error: (err) => throwError(() => new Error("Couldn't register user")),
            complete: () => {
                this.router.navigate(['/login']);
            },
        });
    }
}
