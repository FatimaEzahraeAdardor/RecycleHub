import { Injectable } from '@angular/core';
import {User} from "../../model/user";
import {catchError, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  // addUser(userData: any):void {
  //   const users =JSON.parse(localStorage.getItem('users')|| '[]');
  //   users.push(userData);
  //   localStorage.setItem('users', JSON.stringify(users));
  // }
  addUser(userData: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, userData);
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        const user = users[0];
        if (user && user.password === password) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }
        return null;
      }),
      catchError(err => {
        console.error('Login error:', err);
        throw err;
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');

  }
}
