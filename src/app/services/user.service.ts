import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../common/question";
import {User} from "../common/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/users';
  private urlGetAll = 'http://localhost:8080/questions/getAll';
  private delete: string;

  constructor(private httpClient: HttpClient) { }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put(`${this.url}/updateUser`, user);
  }

  getByEmail(email: String): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/getByEmail/${email}`);
  }

}
