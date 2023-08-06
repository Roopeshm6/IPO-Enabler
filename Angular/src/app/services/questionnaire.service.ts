import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questions } from '../models/questions.model';
import { Questionnaire } from '../models/questionnaire.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  apiUrl = 'https://localhost:7115/api/Questionnnaire'; 

  constructor(private http: HttpClient) { }

  getAllQuestionnaire(): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(this.apiUrl);
  }
  createQuestionnaire(questionnaire:Questionnaire): Observable<any> {
    return this.http.post(this.apiUrl,questionnaire);
  }
  deleteQuestionnaire(id:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl+'/'+id);
  }getAllQuestionnairebyProjectId(projectId:any): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(this.apiUrl+'/'+projectId);
  }
}
