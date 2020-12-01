import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  BASE_URL = 'https://jsonplaceholder.typicode.com/';
  constructor(public httpp: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.httpp.get<User[]>(`${this.BASE_URL}users`);
  }

  public addUser(user: User): Observable<User> {
    return this.httpp.post<User>(`${this.BASE_URL}`, user);
  }
}
