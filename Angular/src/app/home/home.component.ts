import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { UserRole } from '../models/userrole.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  userId :any='';
  users:User[] =[];
  projects:Project[] = [];
  userRoles: UserRole={
    userroleId: '',
    roleId: '',
    firstname: '',
    lastname: '',
    email: '',
    createdOn: new Date(),
    createdBy: '',
    lastModifiedOn: new Date(),
    lastModifiedBy: '',
    userId: '',
    userStatus: 0,
    userName: ''
  };
  displayUser:any;
  constructor(private http:HttpClient,private router:Router,private route: ActivatedRoute,private loginService:LoginService,private projectService:ProjectService)
  {

  }
  ngOnInit(): void {
    this.userId= this.route.snapshot.params['userId'];
    this.loginService.getAllUsers().subscribe(response => 
    {
         this.users = response
    });
    this.projectService.getAllUserProjects(this.userId).subscribe((res)=>{
      this.projects = res
    });
    this.loginService.getUserRolebyId(this.userId).subscribe(response =>{
      this.userRoles = response;
    });
    if(this.userRoles.roleId == 'EA5FCA14-EDCF-458F-930C-C4301C94C360')
    {
      this.displayUser = true;
    }
    else if(this.userRoles.roleId == 'E2475B90-606F-484E-8BDB-F15A4E29E73D')
    {
      this.displayUser = false;
    }
    else{
      this.displayUser = false;
    }
  }
  addProject(){
    this.router.navigate([`/addNewProject/${this.userId}/${this.userRoles.userroleId}`]);
  }
  downloadPdf():void{
    const url = 'assets/IPOEnabler.pdf';
    window.open(url,'_blank');
  }
  openContact():void{
    this.router.navigate([`/contact/${this.userId}/${this.userRoles.roleId}`]);
  }
  displayUsers():void{
    this.router.navigate([`/users/${this.userId}/${this.userRoles.roleId}`]);
  }
  gotoQuestionnaire(project:any){
    if(this.userRoles.roleId == 'A5A6D623-B0B9-42BE-ACC9-AD8B439AE8C9')
    {
      this.router.navigate([`/questions/${this.userId}/${project.id}/${this.userRoles.roleId}`]);
    }
    else{
      this.router.navigate([`/setupQuestionnaire/${this.userId}/${project.id}/${this.userRoles.roleId}`]);
    }
    
  }
  notification():void{
    this.router.navigate([`/notification/${this.userId}/${this.userRoles.roleId}`]);
  }
}
