import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Collection } from "../../model/collection";
import { Observable } from "rxjs";
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
    return this.http.get<Collection[]>(`${this.apiUrl}`);
  }

  getCollectionsByParticular(particularId: string): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}?particularId=${particularId}`);
  }
  deleteCollection(collectionId: string | null): Observable<Collection> {
    return this.http.delete<Collection>(`${this.apiUrl}/${collectionId}`);
  }
  updateCollection(collectionId:string ,collection: Collection): Observable<Collection> {
    return this.http.put<Collection>(`${this.apiUrl}/${collectionId}`, collection);
  }
  getCollectionById(id: string): Observable<Collection> {
    return this.http.get<Collection>(`${this.apiUrl}/${id}`);
  }
  updateCollectionStatus(
      collectionId: string,
      status: 'pending' | 'occupied' | 'in-progress' | 'validated' | 'rejected',
      collectorId: string
  ): Observable<Collection> {
    return this.http.patch<Collection>(`${this.apiUrl}/${collectionId}`, { status, collectorId });
  }
}
