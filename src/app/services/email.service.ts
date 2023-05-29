import { Injectable } from '@angular/core';
import {User} from "../common/user";
import {Question} from "../common/question";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private url = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  sendEmail(user: User): Observable<any> {
    const body = {
      recipient: user.email,
      msgBody: 'Unfortunately you have been banned from My Stack.',
      subject: 'You have been banned'
    };
    return this.httpClient.post(`${this.url}/sendMail`, body);
  }
}
