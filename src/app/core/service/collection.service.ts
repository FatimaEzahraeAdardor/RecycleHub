import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Collection } from "../../model/collection";
import { Observable } from "rxjs";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = 'http://localhost:3000/collections';

  constructor(private http: HttpClient) { }

  collectionRequest(collection: Collection): Observable<Collection> {
    return this.http.post<Collection>(this.apiUrl, collection);
  }

  getAllCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.apiUrl);
  }

  getCollectionsByParticular(particularId: string): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}?particularId=${particularId}`);
  }
  deleteCollection(collectionId: string | null): Observable<Collection> {
    return this.http.delete<Collection>(`${this.apiUrl}/${collectionId}`);
  }
}
