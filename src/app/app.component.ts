import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "./services/auth.service";
import {User} from "./common/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myStack';
  user: User;
  constructor(public router: Router,
              public authService: AuthService) {
    this.user = authService.getUserFromLocalStorage();
  }

  logOut() {
    this.authService.removeUserFromLocalStorage();
    this.authService.setAuthInLocalStorage(false);
    this.router.navigateByUrl(`/login`).then();
  }
}
