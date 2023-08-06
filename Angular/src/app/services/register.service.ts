import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrl = 'https://localhost:7115/api/Register'; 

  constructor(private http: HttpClient) { }

  needToAddUsers(register:Register): Observable<any> {
    return this.http.post(this.apiUrl,register);
  }
  getAllUsersinRegister(): Observable<Register[]> {
    return this.http.get<Register[]>(this.apiUrl);
  }
}
