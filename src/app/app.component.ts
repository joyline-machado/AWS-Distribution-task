import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AWS-Project';

   constructor(public authService: AuthService, private router: Router, private auth: Auth) {}

  logout(): Promise<void> {
    return signOut(this.auth); // ✅ Make sure you return this
  }
}
