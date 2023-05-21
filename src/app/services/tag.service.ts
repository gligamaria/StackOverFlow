import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Tag} from "../common/tag";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private url = 'http://localhost:8080/api/tags';

  constructor(private httpClient: HttpClient) { }

  getTagList(): Observable<Tag[]> {
    return this.httpClient.get<GetResponse>(this.url).pipe(
      map(response => response._embedded.tags)
    );
  }
}

interface GetResponse {
  //unwrap the spring data REST
  _embedded: {
    tags: Tag[];
  }
}
