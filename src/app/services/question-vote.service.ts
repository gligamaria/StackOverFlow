import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuestionVote} from "../common/question-vote";

@Injectable({
  providedIn: 'root'
})
export class QuestionVoteService {

  private url = 'http://localhost:8080/questionVotes';

  constructor(private httpClient: HttpClient) { }

  addVote(questionVote: QuestionVote): Observable<any>{
    return this.httpClient.post(`${this.url}/insertVote`, questionVote);
  }

  checkForVote(userId: number, questionId: number): Observable<QuestionVote>{
    return this.httpClient.get<QuestionVote>(`${this.url}/getByUserAndQuestion/${userId}/${questionId}`);
  }
}
