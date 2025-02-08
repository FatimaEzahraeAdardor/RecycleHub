import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Collection} from "../../model/collection";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = 'http://localhost:3000/collections';
  constructor(private http: HttpClient) { }
  collectionRequest(collection: Collection): Observable<Collection> {
    return this.http.post<Collection>(this.apiUrl, collection);
  }
}
