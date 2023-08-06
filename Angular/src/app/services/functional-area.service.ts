import { Injectable } from '@angular/core';
import { FunctionalArea } from '../models/functionalArea.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionalAreaService {

  apiUrl = 'https://localhost:7115/api/FunctionalArea'; 

  constructor(private http: HttpClient) { }

  getAllFunctionalAreas(): Observable<FunctionalArea[]> {

    return this.http.get<FunctionalArea[]>(this.apiUrl);
  }
}
