import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Answer} from "../common/answer";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private url = 'http://localhost:8080/answers';

  constructor(private httpClient: HttpClient) {
  }

  getAnswerList(questionId: number): Observable<Answer[]> {
    const questionUrl = `${this.url}/getByQuestionId/${questionId}`;
    return this.httpClient.get<Answer[]>(questionUrl)
  }

  getAnswerByID(answerId: number): Observable<Answer> {
    const answerUrl = `${this.url}/getById/${answerId}`;
    return this.httpClient.get<Answer>(answerUrl)
  }

  deleteAnswer(answerId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/deleteById/${answerId}`);
  }

  addAnswer(answer: Answer, questionId: number): Observable<any> {
    return this.httpClient.post(`${this.url}/insertAnswer/${questionId}`, answer);
  }

  updateAnswer(answerId: number, oldAnswer: Answer) {
    return this.httpClient.put(`${this.url}/updateAnswer/${answerId}`, oldAnswer);
  }
}
