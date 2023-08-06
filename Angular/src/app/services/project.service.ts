import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { Projects } from '../models/projects.model';
import { MainProject } from '../models/mainprojects.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiUrl = 'https://localhost:7115/api/Project'; 

  constructor(private http: HttpClient) { }
  createProject(project:Project): Observable<any> {
    var url='https://localhost:7115/api/Projects'
    return this.http.post(url,project);
  }
  getAllProjects(): Observable<Project[]> {

    return this.http.get<Project[]>(this.apiUrl);
  }
  getAllUserProjects(id:any): Observable<Project[]> {
    var url='https://localhost:7115/api/Projects'
    return this.http.get<Project[]>(url+'/'+id);
  }
  getAllProjectsForUsers(): Observable<MainProject[]> {
    var url='https://localhost:7115/api/Projects'
    return this.http.get<MainProject[]>(url);
  }
  getProjectbyProjectId(id:any): Observable<Project> {
    //var url='https://localhost:7115/api/Projects'
    return this.http.get<Project>(this.apiUrl+'/'+id);
  }
  deleteUserProject(id:any):Observable<any>{
    //var url = 'https://localhost:7115/api/UsersRole'
    return this.http.delete<any>(this.apiUrl+'/'+id);
  }
  createUserProject(project:Project): Observable<any> {
    var url='https://localhost:7115/api/Projects'
    return this.http.post(url,project);
  }
}

