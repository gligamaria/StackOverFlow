import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {User} from "../common/user";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private backendUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };
    return this.httpClient.post(`${this.backendUrl}/users/login`, body);
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalStorage(): User {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  removeUserFromLocalStorage() {
    localStorage.removeItem('user');
  }

  setAuthInLocalStorage(auth: boolean) {
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  getAuthFromLocalStorage(): boolean {
    const auth = localStorage.getItem('auth');
    return auth ? JSON.parse(auth) : null;
  }

}
