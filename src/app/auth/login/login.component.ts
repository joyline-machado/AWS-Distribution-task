import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroupDirective, FormsModule, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService) {}

  
 // password
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  async login() {
    try {
      await this.authService.login(this.email, this.password);
      // Redirection is handled inside auth.service
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
}
