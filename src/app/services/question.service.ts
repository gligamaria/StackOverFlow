import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { Question } from "../common/question";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private url = 'http://localhost:8080/api/questions';

  constructor(private httpClient: HttpClient) { }

  getQuestionList(): Observable<Question[]>{
    return this.httpClient.get<GetResponse>(this.url).pipe(
      map(response => response._embedded.questions)
    );
  }

  searchQuestions(theKeyword: string):Observable<Question[]> {
    const searchUrl = `${this.url}/search/findByTitleContaining?title=${theKeyword}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.questions)
    );
  }

  getQuestion(questionId: number): Observable<Question> {
    const questionUrl = `${this.url}/${questionId}`;

    return this.httpClient.get<Question>(questionUrl);
  }

  searchQuestionsByUser(theUser: string):Observable<Question[]> {
    const searchUrl = `${this.url}/search/findByAuthorContaining?author=${theUser}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.questions)
    );

  }
}

interface GetResponse {
  //unwrap the spring data REST
  _embedded: {
    questions: Question[];
  }
}
