import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../common/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;
  isLoggingIn: boolean = false;
  isBanned: boolean = false;
  bannedUser: User;

  constructor(private authService: AuthService,
              private userService: UserService) { }

  login() {
    this.isLoggingIn = true;
    this.authService.login(this.email, this.password)
      .subscribe(
        (user: User) => {
          if (user) {
            // Store the user in local storage
            this.authService.setUserInLocalStorage(user);
            this.authService.setAuthInLocalStorage(true);
            // Redirect to the desired URL after successful login
            window.location.href = 'http://localhost:4200/questions';
          } else {
            console.log('Invalid email or password');
          }
        },
        (error) => {
            console.log('Login failed. Error:', error);
            this.userService.getByEmail(this.email).subscribe(
              data => {
                this.bannedUser = data;
                if(this.bannedUser.bannedStatus == 1)
                  this.isBanned = true;
              }
            )

        }
      ).add(() => {
      this.isLoggingIn = false; // Set isLoggingIn to false after the login request completes
    });
  }
}
