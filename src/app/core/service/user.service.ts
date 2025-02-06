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
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }
        return null;
      }));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');

  }
  logout(): void {
    localStorage.removeItem('currentUser');
  }
  getRole(): string | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user).role : null;
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }
  getUserById(userId:string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  deleteUser(userId: string | null): Observable<User> {
    localStorage.removeItem('currentUser');
    return this.http.delete<User>(`${this.apiUrl}/${userId}`);
  }
}
