import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FunctionalArea } from 'src/app/models/functionalArea.model';
import { Industry } from 'src/app/models/industry.model';
import { Questionnaire } from 'src/app/models/questionnaire.model';
import { Questions, QuestionsChecked } from 'src/app/models/questions.model';
import { User } from 'src/app/models/user.model';
import { UserRole } from 'src/app/models/userrole.model';
import { FunctionalAreaService } from 'src/app/services/functional-area.service';
import { IndustryService } from 'src/app/services/industry.service';
import { LoginService } from 'src/app/services/login.service';
import { ProjectService } from 'src/app/services/project.service';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { Guid } from "guid-typescript";
import { QuestionResponse } from 'src/app/models/questionresponse.model';
import { QuestionResponseService } from 'src/app/services/question-response.service';
import { Setup } from 'src/app/models/setup.model';

@Component({
  selector: 'app-setup-questionnaire',
  templateUrl: './setup-questionnaire.component.html',
  styleUrls: ['./setup-questionnaire.component.css']
})
export class SetupQuestionnaireComponent {
  userId :any='';
  industries:Industry[]=[];
  functionalAreas:FunctionalArea[]=[];
  functionalAreaName:any='';
  industryName:any='';
  name:any='';
  nam:any='';
  setup:Setup={
    industry: 0,
    functionalArea: 0
  }
  displayQuestions:boolean=false;
  functionalArea:FunctionalArea={
    id: 0,
    functionalAreaName: '',
    industryId: '',
    createdOn: new Date(),
    createdBy: '',
    lastModifiedOn: new Date(),
    lastModifiedBy: ''
  }
  industry:Industry={
    id: 0,
    industryName: ''
  }
  questions:Questions[ ] = [];
  projectId:any='';
  questionsChecked:QuestionsChecked [ ] =[];
  questionnaires: Questionnaire [] =[];
  questionnaire:Questionnaire={
    questionnaireId: '',
    projectId: '',
    questionId: 0,
    inScope: false,
    criticality: 0,
    createdOn: new Date(),
    createdBy: '',
    lastModifiedOn: new Date(),
    lastModifiedBy: ''
  };
  userRoleId:any='';
  que:Questionnaire[]=[];
  displayUser:any;
  allQuestionnaire: Questionnaire[]=[];
  constructor(private http:HttpClient,
              private router:Router,
              private route: ActivatedRoute,
              private loginService:LoginService,
              private projectService:ProjectService,
              private industryService:IndustryService,
              private functionalAreaService:FunctionalAreaService,
              private questionService:QuestionsService,
              private questionnaireService:QuestionnaireService,
              private questionResponseService:QuestionResponseService)
  {

  }
  ngOnInit(): void {
    this.questionsChecked=[];
    this.userId= this.route.snapshot.params['userId'];
    this.projectId = this.route.snapshot.params['userProjectId'];
    this.userRoleId = this.route.snapshot.params['userRoleId'];
    this.industryService.getAllIndustries().subscribe(response=>{
      this.industries = response;
    });
    this.functionalAreaService.getAllFunctionalAreas().subscribe(response=>{
      this.functionalAreas = response;
    });
    this.questionnaireService.getAllQuestionnaire().subscribe((res)=>{
      this.questionnaires = res;
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
  login(loginForm:NgForm){
    if(loginForm.valid)
    {
      this.questionService.getAllQuestionsbyFunAreaIdIndustryId(this.functionalArea.id,this.industry.id).subscribe((res)=>{
        this.questions = res;
        if(this.questions.length>0)
        {
          this.displayQuestions = true;
        }  
      });
      this.questions.forEach(x=>{
        this.questionResponseService.getQuestionnairebyProjectIdQuestionnaireId(this.projectId,x.questionId).subscribe((res)=>{
          this.que = res;
          if(this.que.length == 0)
          {
            
              this.questionsChecked.push({
                questionId: x.questionId,
                functionAreaId: x.functionAreaId,
                industryId: x.industryId,
                questionName: x.questionName,
                description: x.description,
                createdOn: x.createdOn,
                createdBy: x.createdBy,
                lastModifiedOn: x.lastModifiedOn,
                lastModifiedBy: x.lastModifiedBy,
                checked: false,
                questionnaireId: ''
              })
            
          }
          else{
            this.que.forEach(y=>{
              this.questionsChecked.push({
                questionId: x.questionId,
                functionAreaId: x.functionAreaId,
                industryId: x.industryId,
                questionName: x.questionName,
                description: x.description,
                createdOn: x.createdOn,
                createdBy: x.createdBy,
                lastModifiedOn: x.lastModifiedOn,
                lastModifiedBy: x.lastModifiedBy,
                checked: true,
                questionnaireId: y.questionnaireId
              })
            })
          }
        })
      })
    }
  }
  /*login(loginForm:NgForm)
  {
    this.questionsChecked=[];
    if(loginForm.valid)
    {
      this.questionService.getAllQuestionsbyFunAreaIdIndustryId(this.functionalArea.id,this.industry.id).subscribe((res)=>{
        this.questions = res;
        if(this.questions.length>0)
        {
          this.displayQuestions = true;
        }
        
        this.questions.forEach(x=>{
          if(this.questionnaires.length == 0){
            this.questionsChecked.push({
              questionId: x.questionId,
              functionAreaId: x.functionAreaId,
              industryId: x.industryId,
              questionName: x.questionName,
              description: x.description,
              createdOn: x.createdOn,
              createdBy: x.createdBy,
              lastModifiedOn: x.lastModifiedOn,
              lastModifiedBy: x.lastModifiedBy,
              checked: false,
              questionnaireId:''
            })
          }
          else{
            this.questionnaires.forEach(y=>{
              if(this.questionsChecked.length == 0)
              {
                if(x.questionId == y.questionId && y.projectId == this.projectId)
                {
                  this.questionsChecked.push({
                    questionId: x.questionId,
                    functionAreaId: x.functionAreaId,
                    industryId: x.industryId,
                    questionName: x.questionName,
                    description: x.description,
                    createdOn: x.createdOn,
                    createdBy: x.createdBy,
                    lastModifiedOn: x.lastModifiedOn,
                    lastModifiedBy: x.lastModifiedBy,
                    checked: true,
                    questionnaireId:y.questionnaireId
                  })
                }
                else{
                  this.questionsChecked.push({
                    questionId: x.questionId,
                    functionAreaId: x.functionAreaId,
                    industryId: x.industryId,
                    questionName: x.questionName,
                    description: x.description,
                    createdOn: x.createdOn,
                    createdBy: x.createdBy,
                    lastModifiedOn: x.lastModifiedOn,
                    lastModifiedBy: x.lastModifiedBy,
                    checked: false,
                    questionnaireId :''
                  })
                }
              }
              else{

              }
              
            })
          }
        });

      })
    }
  }*/

  changeFunctionalArea(event:any)
  {
    this.questionsChecked=[];
    this.setup.functionalArea = event.target.value;
    console.log(event.target.value);
    this.functionalAreas.forEach(x=>{
      if(x.id == this.setup.functionalArea)
      {
        this.functionalArea.functionalAreaName = x.functionalAreaName,
        this.functionalArea.createdBy = x.createdBy,
        this.functionalArea.createdOn = x.createdOn,
        this.functionalArea.industryId = x.industryId,
        this.functionalArea.id = x.id,
        this.functionalArea.lastModifiedBy = x.lastModifiedBy,
        this.functionalArea.lastModifiedOn = x.lastModifiedOn
      }
    }) 
  }
  changeIndustry(event:any)
  {
    this.questionsChecked=[];
    this.setup.industry = event.target.value;
    this.industries.forEach(x=>{
      if(this.setup.industry == x.id)
      {
        this.industry.id = x.id,
        this.industry.industryName = x.industryName
      }
    })

  }
  change(event:any)
  {
    console.log(event.target.value);
    this.name= event.target.value;
  }
  changeFun(event:any){
    console.log(event.target.value);
    this.nam= event.target.value;
  }
  selectquestion(event:any,questionId:any){
    if(event.checked == true)
    {
      this.questionsChecked.forEach(c=>{
        if(c.questionId == questionId)
        {
          c.checked = true;
        }
      })
    }
    if(event.checked == false)
    {
      this.questionsChecked.forEach(c=>{
        if(c.questionId == questionId)
        {
          c.checked = false;
        }
      })
    }
  }
  addQuestionnaire(){
    this.questionsChecked.forEach(x=>{
      if(x.checked == true)
      {
        this.questionnaire.questionId = x.questionId,
        this.questionnaire.projectId = this.projectId,
        this.questionnaire.createdBy = this.userId,
        this.questionnaire.lastModifiedBy = this.userId,
        this.questionnaire.inScope = true,
        this.questionnaire.criticality =0,
        this.questionnaireService.createQuestionnaire(this.questionnaire).subscribe((res)=>{
          alert("Questionnaire got updated!")
          window.location.reload();
        })
        this.questionnaires.forEach(y=>{
          if(y.questionnaireId == x.questionnaireId)
          {
            
          }
          else{
            
          }
        })
        
      }
      if(x.checked == false)
      {
        this.questionnaires.forEach(y=>{
          if(y.questionnaireId == x.questionnaireId)
          {
            this.questionnaire.questionnaireId = x.questionnaireId,
            this.questionnaire.projectId = this.projectId,
            this.questionnaire.questionId = x.questionId
            this.questionnaireService.deleteQuestionnaire(this.questionnaire.questionnaireId).subscribe((res)=>{
              console.log("Questionnaire Deleted Succefully")
              window.location.reload();
            })
          }
        })
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
  GotoSetupQuestionnaire(){
    this.router.navigate([`/setupQuestionnaire/${this.userId}/${this.projectId}/${this.userRoleId}`]);
  }
  GotoQuestions(){
    this.router.navigate([`/questions/${this.userId}/${this.projectId}/${this.userRoleId}`]);
  }
  GotoProjectOverview(){
    this.router.navigate([`/scatterplot/${this.userId}/${this.projectId}/${this.userRoleId}`]);
  }
  addNewQuestion(){
    this.router.navigate([`/addNewQuestion/${this.userId}/${this.projectId}/${this.userRoleId}`]);
  }
  notification():void{
    this.router.navigate([`/notification/${this.userId}/${this.userRoleId}`]);
  }
}
