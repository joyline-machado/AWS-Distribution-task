import { Auth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: any = null;
  userData: Observable<any>;
  private auth = inject(Auth);

  constructor( private firestore: Firestore, private router: Router, private afAuth: AngularFireAuth) {
    this.userData = this.afAuth.authState;
  }

  async login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    const userDoc = doc(this.firestore, `users/${cred.user.uid}`);
    const userSnap = await getDoc(userDoc);
    this.user = { uid: cred.user.uid, ...userSnap.data() };
    localStorage.setItem('user', JSON.stringify(this.user));

    // Navigate based on role
    const role = this.user.role;
    if (role === 'admin') this.router.navigate(['/admin']);
    else this.router.navigate(['/client']);
  }

  getUser() {
    return this.user || JSON.parse(localStorage.getItem('user')!);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
