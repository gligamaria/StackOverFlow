import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from "rxjs/operators";
import {Answer} from "../common/answer";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private url = 'http://localhost:8080/api/answers';

  constructor(private httpClient: HttpClient) {
  }

  getAnswerList(): Observable<Answer[]> {
    return this.httpClient.get<GetResponse>(this.url).pipe(
      map(response => response._embedded.answers)
    );
  }
}

interface GetResponse {
  //unwrap the spring data REST
  _embedded: {
    answers: Answer[];
  }
}
