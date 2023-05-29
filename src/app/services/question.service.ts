import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { Question } from "../common/question";
import {AnswerVote} from "../common/answer-vote";
import {Tag} from "../common/tag";
import {Answer} from "../common/answer";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private url = 'http://localhost:8080/questions';
  private urlGetAll = 'http://localhost:8080/questions/getAll';

  constructor(private httpClient: HttpClient) { }

  getQuestionList(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.urlGetAll)
  }

  searchQuestions(theKeyword: string):Observable<Question[]> {
    const searchUrl = `${this.url}/findByTitleContaining/${theKeyword}`;
    return this.httpClient.get<Question[]>(searchUrl)
  }

  getQuestion(questionId: number): Observable<Question> {
    const questionUrl = `${this.url}/getById/${questionId}`;
    return this.httpClient.get<Question>(questionUrl);
  }

  addQuestion(question: Question): Observable<any>{
    return this.httpClient.post(`${this.url}/insertQuestion`, question);
  }

  searchQuestionsByUser(theUser: string):Observable<Question[]> {
    const searchUrl = `${this.url}/getByAuthor/${theUser}`;
    return this.httpClient.get<Question[]>(searchUrl);

  }

  deleteQuestion(questionId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/deleteById/${questionId}`);
  }

  searchQuestionsByTag(theTag: string):Observable<Question[]> {
    const searchUrl = `${this.url}/getByTag/${theTag}`;
    return this.httpClient.get<Question[]>(searchUrl);
  }

  addTags(tags: string[]): Observable<any>{
    return this.httpClient.post(`${this.url}/addTags`,tags);
  }

  addAnswer(answer: Answer, questionId: number): Observable<any>{
    return this.httpClient.post(`${this.url}/${questionId}/addAnswer`, answer);
  }

  updateQuestion(questionId: number, question: Question): Observable<any>{
    return this.httpClient.put(`${this.url}/updateQuestion/${questionId}`, question);
  }
}
