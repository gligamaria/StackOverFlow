import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, catchError, of} from 'rxjs';
import {AnswerVote} from "../common/answer-vote";

@Injectable({
  providedIn: 'root'
})
export class AnswerVoteService {

  private url = 'http://localhost:8080/answerVotes';

  constructor(private httpClient: HttpClient) { }

  addVote(answerVote: AnswerVote): Observable<any>{
    return this.httpClient.post(`${this.url}/insertVote`, answerVote);
  }

  checkForVote(userId: number, answerId: number): Observable<AnswerVote>{
    return this.httpClient.get<AnswerVote>(`${this.url}/getByUserAndAnswer/${userId}/${answerId}`);
  }

}

