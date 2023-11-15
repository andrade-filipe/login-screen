import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

    forgotPasswordForm = new FormGroup({
        email: new FormControl('', Validators.required),
    });

    onSubmit(){

    }

}
