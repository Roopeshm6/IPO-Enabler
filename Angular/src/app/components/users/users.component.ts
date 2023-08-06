import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainProject } from 'src/app/models/mainprojects.model';
import { Project } from 'src/app/models/project.model';
import { Projects} from 'src/app/models/projects.model';
import { User } from 'src/app/models/user.model';
import { UserRole } from 'src/app/models/userrole.model';
import { LoginService } from 'src/app/services/login.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userId :any='';
  users:User[] =[];
  projects:Project[] = [];
  userProjects:Project[]=[];
  userRole:UserRole = {
    userroleId:'',
    roleId:'',
    firstname:'',
    lastname:'',
    email:'',
    createdOn : new Date(),
    createdBy:'',
    lastModifiedOn:new Date(),
    lastModifiedBy:'',
    userId:'',
    userStatus:0,
    userName:''
  };
  disabledProject:Projects[]=[];
  disabledProject1:Projects[]=[];
  mainProject:MainProject[]=[];
  userStatus:any ='';
  editUserDetails:any='';
  createProject:Project={
    id: '',
    projectName: '',
    userId: '',
    createdOn: new Date(),
    createdBy: '',
    lastModifiedOn: new Date(),
    lastModifiedBy: '',
    projectId: 0
  };
  userRoleId:any='';
  displayUser:any;
  constructor(private http:HttpClient,private router:Router,private route: ActivatedRoute, private loginService:LoginService,private projectService:ProjectService)
  {

  }
  ngOnInit(): void {
    this.userId= this.route.snapshot.params['userId'];
    this.userRoleId= this.route.snapshot.params['userRoleId'];
    this.loginService.getAllUsers().subscribe(response => 
      {
         this.users = response
      }
     );
     this.projectService.getAllProjectsForUsers().subscribe((res=>{
      this.mainProject = res;
    }));
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
  addUser(){
    this.router.navigate([`/addUser/${this.userId}/${this.userRoleId}`]);
  }
  notification():void{
    this.router.navigate([`/notification/${this.userId}/${this.userRoleId}`]);
  }
  viewUser(user:any):void{
    this.disabledProject=[];
    this.editUserDetails = false;
    this.userRole.userId = user.id;
    this.loginService.getUserRolebyId(this.userRole.userId).subscribe((res)=>{
      this.userRole = res;
      if(res.userStatus == 0)
      {
        this.userStatus = 'Awaiting for Access';
      }
      else if(res.userStatus == 1)
      {
        this.userStatus = 'Access Provided'
      }
      else if(res.userStatus == 2)
      {
        this.userStatus = 'Access Denied'
      }
    });
    this.mainProject.forEach(x=>{
      this.disabledProject.push({
        id: x.id,
        projectName: x.projectName,
        userId: '',
        select: false,
        userProject: ''
      })
    });
    this.projectService.getAllUserProjects(this.userRole.userId).subscribe((res=>{
      this.userProjects = res;
      this.disabledProject.forEach(x=>{
        this.userProjects.forEach(y=>{
          if(y.projectId == x.id || x.select == true)
          {
            x.userId = y.userId,
            x.userProject = y.id,
            x.select = true
          }
          else{
            x.userId= y.userId,
            x.select =  false,
            x.userProject =''
          }
        })
      })
    })
    )

  }
  /*viewUser(user:any):void{
    this.disabledProject=[];
    this.disabledProject1=[];
    this.editUserDetails = false;
    this.userRole.userId = user.id;
    this.loginService.getUserRolebyId(this.userRole.userId).subscribe((res)=>{
      this.userRole = res;
      if(res.userStatus == 0)
      {
        this.userStatus = 'Awaiting for Access';
      }
      else if(res.userStatus == 1)
      {
        this.userStatus = 'Access Provided'
      }
      else if(res.userStatus == 2)
      {
        this.userStatus = 'Access Denied'
      }
    });
    this.projectService.getAllProjectsForUsers().subscribe((res=>{
      this.mainProject = res;
    }));
    this.projectService.getAllUserProjects(this.userRole.userId).subscribe((res=>{
      this.userProjects = res;
      this.mainProject.forEach(x=>{
        if(this.userProjects.length==0)
        {
          this.disabledProject1.push({
            id:x.id,
            projectName: x.projectName,
            select: false,
            userId:this.userRole.userId,
            userProject:''
          })
        }
        if(this.userProjects.length>0)
        {
          this.userProjects.forEach(y=>{
            if(x.id === y.projectId)
            {
              this.disabledProject.push({
                id: y.projectId,
                projectName: y.projectName,
                userId: y.userId,
                select: true,
                userProject:y.id
              })
            }
            else{
              this.disabledProject1.push({
                id:x.id,
                projectName: x.projectName,
                select: false,
                userId:this.userRole.userId,
                userProject:y.id
              })
            }
          })
        }
      })
    }));
  }*/
  deleteUser(user:any){
    this.loginService.deleteUser(user.id).subscribe((res) => {
      alert("User Deleted successfully");
      window.location.reload();
    })
  }
  editUser(user:any){
    this.disabledProject=[];
    this.userRole.userId = user.id;
    this.editUserDetails = true;
    this.loginService.getUserRolebyId(this.userRole.userId).subscribe((res)=>{
      this.userRole = res;
      if(res.userStatus == 0)
      {
        this.userStatus = 'Awaiting for Access';
      }
      else if(res.userStatus == 1)
      {
        this.userStatus = 'Access Provided'
      }
      else if(res.userStatus == 2)
      {
        this.userStatus = 'Access Denied'
      }
    });
    this.mainProject.forEach(x=>{
      this.disabledProject.push({
        id: x.id,
        projectName: x.projectName,
        userId: user.id,
        select: false,
        userProject: ''
      })
    });
    this.projectService.getAllUserProjects(this.userRole.userId).subscribe((res=>{
      this.userProjects = res;
      this.disabledProject.forEach(x=>{
        this.userProjects.forEach(y=>{
          if(y.projectId == x.id || x.select == true)
          {
            x.userId = y.userId,
            x.userProject = y.id,
            x.select = true
          }
          else{
            x.userId= y.userId,
            x.select =  false,
            x.userProject =''
          }
        })
      })
    }))
  }
  /*editUser(user:any){
    this.disabledProject=[];
    this.disabledProject1=[];
    this.userRole.userId = user.id;
    this.editUserDetails = true;
    this.loginService.getUserRolebyId(this.userRole.userId).subscribe((res)=>{
      this.userRole = res;
      if(res.userStatus == 0)
      {
        this.userStatus = 'Awaiting for Access';
      }
      else if(res.userStatus == 1)
      {
        this.userStatus = 'Access Provided'
      }
      else if(res.userStatus == 2)
      {
        this.userStatus = 'Access Denied'
      }
    })
    this.projectService.getAllUserProjects(this.userRole.userId).subscribe((res=>{
      this.userProjects = res;
      this.mainProject.forEach(x=>{
        if(this.userProjects.length==0)
        {
          this.disabledProject1.push({
            id:x.id,
            projectName: x.projectName,
            select: false,
            userId:this.userRole.userId,
            userProject:''
          })
        }
        if(this.userProjects.length>0)
        {
          this.userProjects.forEach(y=>{
            if(x.id === y.projectId)
            {
              this.disabledProject.push({
                id: y.projectId,
                projectName: y.projectName,
                userId: y.userId,
                select: true,
                userProject:y.id
              })
            }
            else{
              this.disabledProject1.push({
                id:x.id,
                projectName: x.projectName,
                select: false,
                userId:this.userRole.userId,
                userProject:y.id
              })
            }
          })
        }
      })
    }));
  }*/
  updateUserProject(event:any,project:any,projectId:any)
  {
    if(project.select==false)
    {
      this.createProject.userId = project.userId;
      this.createProject.projectId = project.id;
      this.createProject.createdOn = new Date();
      this.createProject.lastModifiedOn = new Date();
      this.createProject.createdBy = this.userId;
      this.createProject.lastModifiedBy = this.userId;
      this.createProject.projectName = project.projectName;
      this.projectService.createUserProject(this.createProject).subscribe((res=>{
        alert("Project added to the user successfully");
        window.location.reload();
      }))
      //this.projectService.createUserProject(this.)
    }
    if(project.select==true)
    {
      this.projectService.deleteUserProject(projectId).subscribe((res)=>{
        alert("Project Delete for the user successfully");
        window.location.reload();
      });
      this.disabledProject.forEach((x=>{
        if(x.id == project)
        {
          x.select = false;
        }
      }))
    }
    
  }
}
