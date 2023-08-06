import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  {User} from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(user:User) {
    return this.http.post('login', { user});
  }

  getProducts(): Observable<User[]> {
    return this.http.get<User[]>('login', {
      headers: {},
    });
  }
}