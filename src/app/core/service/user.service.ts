import { Injectable } from '@angular/core';
import {User} from "../../model/user";
import {catchError, map, Observable, switchMap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {WasteDetail} from "../../model/collection";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

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
  /**
   * Calculate points based on waste type and weight (converted from grams to kg).
   */
  calculatePoints(wasteDetails: WasteDetail[]): number {
    return wasteDetails.reduce((total, waste) => {
      const weightKg = waste.weight / 1000; // Convert grams to kg
      switch (waste.type.toLowerCase()) {
        case 'plastique': return total + weightKg * 2;
        case 'verre': return total + weightKg * 1;
        case 'papier': return total + weightKg * 1;
        case 'métal': return total + weightKg * 5;
        default: return total;
      }
    }, 0);
  }
  /**
   * Updates the user's points after validating a collections.
   */
  updateUserPoints(particularId: string, pointsToAdd: number): Observable<User> {
    return this.getUserById(particularId).pipe(
      switchMap(user => {
        user.points = (user.points || 0) + pointsToAdd; // Ensure points field exists
        return this.updateUser(user);
      }),
      catchError(error => {
        console.error('Error updating user points:', error);
        return throwError(() => new Error('Failed to update user points'));
      })
    );
  }


}
