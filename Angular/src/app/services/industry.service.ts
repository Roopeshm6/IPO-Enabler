import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Industry } from '../models/industry.model';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {
  apiUrl = 'https://localhost:7115/api/Industry'; 

  constructor(private http: HttpClient) { }

  getAllIndustries(): Observable<Industry[]> {

    return this.http.get<Industry[]>(this.apiUrl);
  }
}
