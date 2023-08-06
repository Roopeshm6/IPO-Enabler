import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FunctionalArea } from 'src/app/models/functionalArea.model';
import { Industry } from 'src/app/models/industry.model';
import { Questions } from 'src/app/models/questions.model';
import { FunctionalAreaService } from 'src/app/services/functional-area.service';
import { IndustryService } from 'src/app/services/industry.service';
import { LoginService } from 'src/app/services/login.service';
import { ProjectService } from 'src/app/services/project.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.css']
})
export class AddNewQuestionComponent implements OnInit {
  userId :any='';
  industries:Industry[]=[];
  functionalAreas:FunctionalArea[]=[];
  name:any='';
  nam:any='';
  projectId:any='';
  question:Questions={
    questionId: 0,
    functionAreaId: 0,
    industryId: 0,
    questionName: '',
    description: '',
    createdOn: new Date(),
    createdBy: '',
    lastModifiedOn: new Date(),
    lastModifiedBy: ''
  }
  userRoleId:any='';
  displayUser:any;
  constructor(private http:HttpClient,private router:Router,private route: ActivatedRoute,private loginService:LoginService,private projectService:ProjectService,
              private industryService:IndustryService, private functionalAreaService:FunctionalAreaService, private questionService:QuestionsService)
  {

  }
  ngOnInit(): void {
    this.userId= this.route.snapshot.params['userId'];
    this.projectId = this.route.snapshot.params['userProjectId'];
    this.userRoleId = this.route.snapshot.params['userRoleId'];
    this.industryService.getAllIndustries().subscribe(response=>{
      this.industries = response;
    });
    this.functionalAreaService.getAllFunctionalAreas().subscribe(response=>{
      this.functionalAreas = response;
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
  login(questionForm:any)
  {
    if(questionForm.valid)
    {
      this.question.description = questionForm.form.value.description;
      this.question.questionName = questionForm.form.value.question;
      this.question.createdBy = this.userId;
      this.question.lastModifiedBy = this.userId;
      this.question.createdOn = new Date();
      this.question.lastModifiedOn = new Date();
      this.questionService.createQuestion(this.question).subscribe(response =>{
        alert("Question Created Successfully");
        this.router.navigate([`/setupQuestionnaire/${this.userId}/${this.projectId}/${this.userRoleId}`]);
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
  change(event:any)
  {
    console.log(event.target.value);
    this.name= event.target.value;
    this.industries.forEach(x=>{
      if(this.name == x.industryName)
      {
       this.question.industryId = x.id
      }
    })
  }
  changeFun(event:any){
    console.log(event.target.value);
    this.nam= event.target.value;
    this.functionalAreas.forEach(x=>{
      if(this.nam == x.functionalAreaName)
      {
       this.question.functionAreaId = x.id
      }
    })
  }
}
