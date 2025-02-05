import { Injectable } from '@angular/core';
import {User} from "../../model/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';  // Ensure this matches the JSON server port

  constructor(private http: HttpClient) { }

  addUser(userData: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, userData);
  }
}
