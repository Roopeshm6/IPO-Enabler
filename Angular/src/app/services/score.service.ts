import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Score } from '../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  apiUrl = 'https://localhost:7115/api/Score'; 

  constructor(private http: HttpClient) { }

  getScorebyFuncAreaIdProjectId(funAreaId: any, projectId:any): Observable<Score[]> {
    return this.http.get<Score[]>(this.apiUrl+'/'+funAreaId+'/'+projectId);
  }
  getAllScore():Observable<Score[]>{
    return this.http.get<Score[]>(this.apiUrl);
  }
}
