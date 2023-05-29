import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../common/tag";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private url = 'http://localhost:8080/tags';
  private urlGetAll = 'http://localhost:8080/tags/getAll';
  private urlTitles = 'http://localhost:8080/tags/getTitles';


  constructor(private httpClient: HttpClient) { }

  getTagList(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>(this.urlGetAll)
  }

  getTitles(): Observable<String[]> {
    return this.httpClient.get<String[]>(this.urlTitles)
  }

  getTagListByQuestion(questionId: number): Observable<Tag[]> {
    const questionUrl = `${this.url}/getByQuestionId/${questionId}`;
    return this.httpClient.get<Tag[]>(questionUrl)
  }
}
