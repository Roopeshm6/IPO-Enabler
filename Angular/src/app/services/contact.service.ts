import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  apiUrl = 'https://localhost:7115/api/Contact'; 

  constructor(private http: HttpClient) { }
  sendEmail(contact:Contact): Observable<any> {

    return this.http.post(this.apiUrl,contact);
  }
  
}
