import { HttpClient } from '@angular/common/http';
import { Component,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from 'src/app/models/register.model';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  userId :any='';
  registerUsers:Register[]=[];
  userRoleId:any ='';
  displayUser:any;
  constructor(private http:HttpClient,private router:Router,private route: ActivatedRoute,private regitserService:RegisterService)
  {

  }
  ngOnInit(): void {
    this.userId= this.route.snapshot.params['userId'];
    this.userRoleId= this.route.snapshot.params['userRoleId'];
    this.regitserService.getAllUsersinRegister().subscribe((res)=>{
      this.registerUsers = res;
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
  gotoQuestionnaire(project:any){
    this.router.navigate([`/setupQuestionnaire/${this.userId}/${project.id}/${this.userRoleId}`]);
  }
  notification():void{
    this.router.navigate([`/notification/${this.userId}/${this.userRoleId}`]);
  }
  Gotohome():void{
    this.router.navigate([`/home/${this.userId}`]);
  }
}
