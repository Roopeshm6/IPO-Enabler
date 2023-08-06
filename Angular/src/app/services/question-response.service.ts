import { Injectable } from '@angular/core';
import { QuestionResponse } from '../models/questionresponse.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questionnaire } from '../models/questionnaire.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionResponseService {

  apiUrl = 'https://localhost:7115/api/QuestionResponse'; 

  constructor(private http: HttpClient) { }
  createQuestionResponse(questionResponse:QuestionResponse): Observable<any> {
    return this.http.post(this.apiUrl,questionResponse);
  }
  getAllQuestionResponses(): Observable<QuestionResponse[]> {
    return this.http.get<QuestionResponse[]>(this.apiUrl);
  }
  getQuestionResponsebyQuestionnaireId(questionnaireId:any): Observable<QuestionResponse> {

    return this.http.get<QuestionResponse>(this.apiUrl+'/'+questionnaireId);
  }
  getQuestionnairebyProjectIdQuestionnaireId(projectId:any,questionId:any): Observable<Questionnaire[]> {

    return this.http.get<Questionnaire[]>(this.apiUrl+'/'+projectId+'/'+questionId);
  }
}
