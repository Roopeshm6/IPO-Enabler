import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserRole } from '../models/userrole.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'https://localhost:7115/api/Login'; 

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.apiUrl);
  }
  getUserbyId(id : any):Observable<User>{
    return this.http.get<User>(this.apiUrl+'/'+id);
  }
  getUserRolebyId(id:any):Observable<UserRole>{
    var url = 'https://localhost:7115/api/UsersRole'
    return this.http.get<UserRole>(url+'/'+id);
  }
  deleteUser(id:any):Observable<any>{
    var url = 'https://localhost:7115/api/UsersRole'
    return this.http.delete<any>(url+'/'+id);
  }
  AddUser(userRole:any): Observable<any> {
    var url='https://localhost:7115/api/UsersRole'
    return this.http.post(url,userRole);
  }
  
}
