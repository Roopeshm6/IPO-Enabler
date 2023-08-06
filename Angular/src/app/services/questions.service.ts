import { Injectable } from '@angular/core';
import { Questions } from '../models/questions.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  apiUrl = 'https://localhost:7115/api/Questions'; 

  constructor(private http: HttpClient) { }

  getAllQuestionsbyFunAreaIdIndustryId(functionalAreaId:any,industryId:any): Observable<Questions[]> {

    return this.http.get<Questions[]>(this.apiUrl+'/'+functionalAreaId+'/'+industryId);
  }
  getAllQuestions(): Observable<Questions[]> {

    return this.http.get<Questions[]>(this.apiUrl);
  }
  createQuestion(questions:Questions): Observable<any> {
    return this.http.post(this.apiUrl,questions);
  }
}
