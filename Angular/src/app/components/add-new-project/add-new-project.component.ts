import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.css']
})
export class AddNewPRojectComponent implements OnInit {
  users:User[] =[];
  project:Project = {
    id:'',
    projectName:'',
    userId:'',
    createdOn:new Date("Fri Dec 08 2019 07:44:57"),
    createdBy:'',
    lastModifiedOn:new Date("Fri Dec 08 2019 07:44:57"),
    lastModifiedBy:'',
    projectId:0,
  };
  name:any='';
  userId :any='';
  userRoleId:any='';
  displayUser:any;
  constructor(private http:HttpClient,private router:Router,private route: ActivatedRoute,private loginService:LoginService,private projectService:ProjectService)
  {

  }
  ngOnInit(): void {
    this.userId= this.route.snapshot.params['userId'];
    this.userRoleId= this.route.snapshot.params['userRoleId'];
    this.loginService.getAllUsers().subscribe(response => 
    {
      this.users = response
    });
    if(this.userRoleId == 'EA5FCA14-EDCF-458F-930C-C4301C94C360')
    {
      this.displayUser = true;
    }
    else if(this.userRoleId == 'E2475B90-606F-484E-8BDB-F15A4E29E73D')
    {
      this.displayUser = false;
    }
    else{
      this.displayUser = false;
    }
  }
  login(loginForm:NgForm)
  {
    if(loginForm.valid)
    {
      this.project.projectName = loginForm.form.value.projectName;
      this.project.createdBy = this.userId;
      this.project.lastModifiedBy = this.userId;
      this.project.createdOn = new Date();
      this.project.lastModifiedOn = new Date();
      this.projectService.createProject(this.project).subscribe((res)=>{
        alert("Project Successfully Created");
        this.router.navigate([`/home/${this.userId}`]);
      })
    }
  }
  change(event:any)
  {
    console.log(event.target.value);
    this.name= event.target.value;
    this.users.forEach( x=>{
      if(x.firstname+' '+x.lastname == this.name)
      {
        this.project.userId = x.id;
      }
    })
  }
  downloadPdf():void{
    const url = 'assets/IPOEnabler.pdf';
    window.open(url,'_blank');
  }
  openContact():void{
    this.router.navigate([`/contact/${this.userId}/${this.userRoleId}`]);
  }
  displayUsers():void{
    this.router.navigate([`/users/${this.userId}/${this.userRoleId}`]);
  }
  Gotohome():void{
    this.router.navigate([`/home/${this.userId}`]);
  }
}
