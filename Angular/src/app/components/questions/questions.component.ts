import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FunctionalArea } from 'src/app/models/functionalArea.model';
import { Industry } from 'src/app/models/industry.model';
import { QuestionLibrary, Questionnaire } from 'src/app/models/questionnaire.model';
import { QuestionResponse } from 'src/app/models/questionresponse.model';
import { Questions } from 'src/app/models/questions.model';
import { FunctionalAreaService } from 'src/app/services/functional-area.service';
import { IndustryService } from 'src/app/services/industry.service';
import { LoginService } from 'src/app/services/login.service';
import { ProjectService } from 'src/app/services/project.service';
import { QuestionResponseService } from 'src/app/services/question-response.service';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  userId:any='';
  projectId:any='';
  questionnaire:Questionnaire[] =[];
  industries:Industry[]=[];
  functionalAreas:FunctionalArea[]=[];
  questionsLibrary:QuestionLibrary[]=[];
  questions:Questions[]=[];
  questionLibrary:QuestionLibrary={
    questionnaireId: '',
    projectId: '',
    questionId: 0,
    functionalAreaId: 0,
    functionalAreaName: '',
    industryId: 0,
    industryName: '',
    questionName: '',
    questionDescription: '',
    inScope: false,
    criticality: 0,
    displayQuestions: false
  }
  veryLowButton=false;
  lowButton = false;
  mediumButton = false;
  highButton = false;
  veryHighButton = false;
  impactLow = false;
  impactMedium = false;
  impactHigh = false;
  effortLow = false;
  effortMedium = false;
  effortHigh = false;
  questionResponse:any ='';
  impactResponse:any ='';
  effortResponse:any ='';
  displayUser:any;
  getQuestionResponse:QuestionResponse[]=[];
  getQuestionResponsebyId:QuestionResponse = {
    responseId: '',
    questionnaireId: '',
    projectId: '',
    response: '',
    impact: '',
    effort: '',
    timing: '',
    observation: '',
    recommendations: '',
    createdOn: new Date(),
    createdBy: '',
    lastModifiedBy: '',
    lastModifiedOn: new Date()
  }
  diableProjectOverview:any='';
  createQuestionResponse:QuestionResponse={
    responseId: '',
    questionnaireId: '',
    projectId: '',
    response: '',
    impact: '',
    effort: '',
    timing: '',
    observation: '',
    recommendations: '',
    createdOn: new Date(),
    createdBy: '',
    lastModifiedBy: '',
    lastModifiedOn: new Date()
  }
  userRoleId:any ='';
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
changeVerylow(){
  this.veryLowButton = true;
  this.lowButton = false;
  this.mediumButton = false;
  this.highButton  = false;
  this.veryHighButton = false;
  this.questionResponse = "Very Low";
}
changeHigh(){
  this.veryLowButton = false;
  this.lowButton = false;
  this.mediumButton = false;
  this.highButton  = true;
  this.veryHighButton = false;
  this.questionResponse = "High";
}
changeLow(){
  this.veryLowButton = false;
  this.lowButton = true;
  this.mediumButton = false;
  this.highButton  = false;
  this.veryHighButton = false;
  this.questionResponse = "Very Low";
}
changeMedium(){
  this.veryLowButton = false;
  this.lowButton = false;
  this.mediumButton = true;
  this.highButton  = false;
  this.veryHighButton = false;
  this.questionResponse = "Medium";
}
changeVeryHigh(){
  this.veryLowButton = false;
  this.lowButton = false;
  this.mediumButton = false;
  this.highButton  = false;
  this.veryHighButton = true;
  this.questionResponse = "Very High";
}
changeImpactLow(){
  this.impactHigh = false;
  this.impactMedium = false;
  this.impactLow = true;
  this.impactResponse = "Low";
}
changeImpactMedium(){
  this.impactHigh = false;
  this.impactMedium = true;
  this.impactLow = false;
  this.impactResponse = "Medium";
}
changeImpactHigh(){
  this.impactHigh = true;
  this.impactMedium = false;
  this.impactLow = false;
  this.impactResponse = "High";
}
changeEffortLow(){
  this.effortHigh = false;
  this.effortMedium = false;
  this.effortLow = true;
  this.effortResponse = "Low";
}
changeEffortMedium(){
  this.effortHigh = false;
  this.effortMedium = true;
  this.effortLow = false;
  this.effortResponse = "Medium";
}
changeEffortHigh(){
  this.effortHigh = true;
  this.effortMedium = false;
  this.effortLow = false;
  this.effortResponse = "High";
}
  ngOnInit(): void {
    this.userId= this.route.snapshot.params['userId'];
    this.projectId = this.route.snapshot.params['userProjectId'];
    this.userRoleId = this.route.snapshot.params['userRoleId'];
    this.questionnaireService.getAllQuestionnairebyProjectId(this.projectId).subscribe((res)=>{
      this.questionnaire = res;
    });
    this.industryService.getAllIndustries().subscribe((res)=>{
      this.industries = res;
    });
    this.functionalAreaService.getAllFunctionalAreas().subscribe((res)=>{
      this.functionalAreas = res;
    });
    this.questionService.getAllQuestions().subscribe((res)=>{
      this.questions = res;
    });
    if(this.userRoleId == 'EA5FCA14-EDCF-458F-930C-C4301C94C360')
    {
      this.displayUser = true;
    }
    else if(this.userRoleId == 'E2475B90-606F-484E-8BDB-F15A4E29E73D')
    {
      this.displayUser = true;
      this.diableProjectOverview = false;
    }
    else{
      this.displayUser = false;
      this.diableProjectOverview = false;
    }
    this.questionsLibrary=[];
    this.veryLowButton=false;
  this.lowButton = false;
  this.mediumButton = false;
  this.highButton = false;
  this.veryHighButton = false;
  this.impactLow = false;
  this.impactMedium = false;
  this.impactHigh = false;
  this.effortLow = false;
  this.effortMedium = false;
  this.effortHigh = false;
    this.questionnaire.forEach(x=>{
      this.questionsLibrary.push({
        questionnaireId: x.questionnaireId,
        projectId: x.projectId,
        questionId: x.questionId,
        functionalAreaId: 0,
        functionalAreaName: '',
        industryId: 0,
        industryName: '',
        questionName: '',
        questionDescription: '',
        inScope: x.inScope,
        criticality: x.criticality,
        displayQuestions: false
      })
    })
    this.questionsLibrary.forEach(x=>{
      this.questions.forEach(y=>{
        if(x.questionId == y.questionId)
        {
          x.functionalAreaId = y.functionAreaId
          x.industryId = y.industryId
          x.questionName = y.questionName
          x.questionDescription = y.description
        }
      })
    })
    this.questionsLibrary.forEach(x=>{
      this.industries.forEach(y=>{
        if(x.industryId == y.id)
        {
          x.industryName = y.industryName
        }
      })
    })
    this.questionsLibrary.forEach(x=>{
      this.functionalAreas.forEach(y=>{
        if(x.functionalAreaId == y.id)
        {
          x.functionalAreaName = y.functionalAreaName
        }
      })
    });
    this.questionResponseService.getAllQuestionResponses().subscribe((res)=>{
      this.getQuestionResponse = res;
    });
  }
  viewQuestion(questionnaireId:any){
    this.questionsLibrary.forEach(x=>{
      if(x.questionnaireId == questionnaireId)
      {
        this.questionLibrary.questionName = x.questionName,
        this.questionLibrary.industryName = x.industryName,
        this.questionLibrary.functionalAreaName = x.functionalAreaName,
        this.questionLibrary.questionDescription = x.questionDescription,
        this.questionLibrary.questionnaireId = x.questionnaireId,
        this.questionLibrary.questionId = x.questionId,
        this.questionLibrary.functionalAreaId = x.functionalAreaId,
        this.questionLibrary.industryId = x.industryId,
        this.questionLibrary.projectId = x.projectId
      }
    })
    if(this.getQuestionResponse.length > 0)
    {
     this.getQuestionResponse.forEach(x=>{
      if(x.questionnaireId == questionnaireId)
      {
        this.questionResponseService.getQuestionResponsebyQuestionnaireId(questionnaireId).subscribe((res)=>{
          this.getQuestionResponsebyId = res;
          if(this.getQuestionResponsebyId.response == "Very Low")
          {
            this.veryLowButton = true;
          }
          else if(this.getQuestionResponsebyId.response == "Low")
          {
            this.lowButton = true;
          }
          else if (this.getQuestionResponsebyId.response == "Medium")
          {
            this.mediumButton = true;
          }
          else if(this.getQuestionResponsebyId.response == "High")
          {
            this.highButton = true;
          }
          else{
            this.veryHighButton = true;
          }
          if(this.getQuestionResponsebyId.effort == "Low")
          {
            this.effortLow = true;
          }
          else if (this.getQuestionResponsebyId.effort == "Medium")
          {
            this.effortMedium = true;
          }
          else{
            this.effortHigh = true;
          }
          if(this.getQuestionResponsebyId.impact == "Low")
          {
            this.impactLow = true;
          }
          else if (this.getQuestionResponsebyId.impact == "Medium")
          {
            this.impactMedium = true;
          }
          else{
            this.impactLow = true;
          }
        })
      }
      else{
        this.veryLowButton = false;
        this.lowButton = false;
        this.mediumButton = false;
        this.highButton = false;
        this.veryHighButton = false;
        this.effortLow = false;
        this.effortMedium = false;
        this.effortHigh = false;
        this.impactLow = false;
        this.impactMedium = false;
        this.impactLow = false;
      }
     })  
    }
  }
  saveQuestionResponse(response:any){
    this.createQuestionResponse.questionnaireId = response.questionnaireId,
    this.createQuestionResponse.projectId = response.projectId,
    this.createQuestionResponse.response = this.questionResponse,
    this.createQuestionResponse.effort = this.effortResponse,
    this.createQuestionResponse.impact = this.impactResponse,
    this.createQuestionResponse.createdBy = this.userId,
    this.createQuestionResponse.lastModifiedBy = this.userId,
    this.createQuestionResponse.recommendations = 'egve',
    this.createQuestionResponse.observation = 'erfde',
    this.createQuestionResponse.timing = 'egvdf'
    this.questionResponseService.createQuestionResponse(this.createQuestionResponse).subscribe((res)=>{
      alert("Question Response Submitted Successfully");
      this.router.navigate([`/setupQuestionnaire/${this.userId}/${this.projectId}/${this.userRoleId}`]);
    });
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
  notification():void{
    this.router.navigate([`/notification/${this.userId}/${this.userRoleId}`]);
  }
}
