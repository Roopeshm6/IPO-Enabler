import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { UserRole } from 'src/app/models/userrole.model';
import { LoginService } from 'src/app/services/login.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  users:User[] =[];
  userRole:UserRole={
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
  }
  name:any='';
  userId :any='';
  userRoleId:any='';
  displayUser:any;
  constructor(private http:HttpClient,private router:Router,private route: ActivatedRoute,private loginService:LoginService,private projectService:ProjectService)
  {

  }
  ngOnInit(): void {
    this.userId= this.route.snapshot.params['userId'];
    this.userRoleId = this.userRoleId.snapshot.params['userRoleId'];
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
      this.userRole.firstname = loginForm.form.value.firstname;
      this.userRole.lastname = loginForm.form.value.lastname;
      this.userRole.email = loginForm.form.value.email;
      this.userRole.userName = loginForm.form.value.firstname+" "+loginForm.form.value.lastname;
      this.userRole.userStatus = 1;
      this.userRole.createdBy = this.userId;
      this.userRole.lastModifiedBy = this.userId;
      this.loginService.AddUser(this.userRole).subscribe((res)=>{
        alert("User added successfully");
        this.router.navigate([`/users/${this.userId}`]);
      })
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
  notification():void{
    this.router.navigate([`/notification/${this.userId}/${this.userRoleId}`]);
  }
}
