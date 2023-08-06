import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Questionnaire } from 'src/app/models/questionnaire.model';
import { Questions } from 'src/app/models/questions.model';
import { QuestionResponseService } from 'src/app/services/question-response.service';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { ScatterData, PlotData} from 'plotly.js';
import { QuestionResponse } from 'src/app/models/questionresponse.model';
import PptxGenJS from "pptxgenjs";
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Guid } from 'guid-typescript';
import { Score } from 'src/app/models/score.model';
import { FunctionalArea } from 'src/app/models/functionalArea.model';
import { FunctionalAreaService } from 'src/app/services/functional-area.service';
import { ScoreService } from 'src/app/services/score.service';
@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements OnInit {
  questions:Questions[]=[];
  userId:any;
  projectId:any;
  questionnaire:Questionnaire[] =[];
  scatterData!: ScatterData[];
  layout!: Partial<Plotly.Layout>;
  getQuestionResponse:QuestionResponse[]=[];
  allQuestionResponse: QuestionResponse[]=[];
  project:Project={
    id: '',
    projectName: '',
    userId: '',
    createdOn: new Date(),
    createdBy: '',
    lastModifiedOn: new Date(),
    lastModifiedBy: '',
    projectId: 0
  }
  scores:Score[]=[];
  allScore:Score[]=[];
  functionalAreas: FunctionalArea[]=[];
  userRoleId:any='';
  displayUser:any;
  constructor(private router:Router,
    private questionResponseService:QuestionResponseService,
    private route: ActivatedRoute,
    private questionService:QuestionsService,
    private questionnaireService:QuestionnaireService,
    private projectService: ProjectService,
    private funAreaService: FunctionalAreaService,
    private scoreService: ScoreService)
    {
    this.scatterData = [];
    this.layout = {title:'Scatter Plot'};
    }
  ngOnInit(): void {
    this.getQuestionResponse =[];
    this.scores =[];
    this.userId= this.route.snapshot.params['userId'];
    this.projectId = this.route.snapshot.params['userProjectId'];
    this.userRoleId = this.route.snapshot.params['userRoleId'];

    this.questionnaireService.getAllQuestionnairebyProjectId(this.projectId).subscribe(response =>{
      this.questionnaire = response
    });
    this.questionService.getAllQuestions().subscribe((res)=>{
      this.questions = res;
    });
    this.questionResponseService.getAllQuestionResponses().subscribe(response => {
      this.allQuestionResponse = response;
    });
    this.projectService.getProjectbyProjectId(this.projectId).subscribe(response => {
      this.project = response;
    });
    this.funAreaService.getAllFunctionalAreas().subscribe(response =>{
      this.functionalAreas = response;
    });
    this.scoreService.getAllScore().subscribe(response =>{
      this.allScore = response;
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
    this.allScore.forEach(x=>{
      this.functionalAreas.forEach(y=>{
        if(x.functionalAreaId == y.id && x.projectId == this.projectId && x.scoreValue>0)
        {
          this.scores.push({
            id: x.id,
            projectId: x.projectId,
            functionalAreaId: x.functionalAreaId,
            scoreValue: x.scoreValue
          })
        }
      })
    })
    this.questionnaire.forEach(x=>{
      this.allQuestionResponse.forEach(y=>{
        if(x.questionnaireId == y.questionnaireId)
        {
          this.questionResponseService.getQuestionResponsebyQuestionnaireId(x.questionnaireId).subscribe(response =>{
            this.getQuestionResponse.push(response);
          })
        }
      })
    });
  }
  createPowerPoint() {
    
    // Create a new presentation
    const ppt = new PptxGenJS();

    // Add a slide to the presentation
    const slide = ppt.addSlide();
    slide.addText('Initial Public Offering(IPO) Enabler', { x: 1, y: 1, fontFace: 'Bold', color: '0066CC',fontSize: 25 });
    slide.addText(this.project.projectName, { x: 1, y: 2, fontFace: 'Arial', fontSize: 24 });
    const funtionalAreaData: { title: string; score: number; status:string;}[] = [];
    var funStatus: string;
    this.allScore.forEach(x=>{
      this.functionalAreas.forEach(y=>{
        if(x.functionalAreaId == y.id)
        {
          if(x.scoreValue>0 && x.scoreValue< 20)
          {
            funStatus = 'Not Ready';
          }
          else if(x.scoreValue>=20 && x.scoreValue < 40)
          {
            funStatus = 'Started Improving'
          }
          else if(x.scoreValue >= 40 && x.scoreValue < 60)
          {
            funStatus = 'In Progress'
          }
          else if(x.scoreValue >= 60 && x.scoreValue < 80)
          {
            funStatus = 'Do Some Changes to Get Ready'
          }
          else if(x.scoreValue >= 80 && x.scoreValue <= 100)
          {
            funStatus = 'Ready'
          }
          funtionalAreaData.push({
            title: y.functionalAreaName,
            score: x.scoreValue,
            status: funStatus
          })
        }
      });
    });
    funtionalAreaData.forEach((slideInfo, index) => {
      const slide = ppt.addSlide();
      slide.addText(slideInfo.title, { x: 1, y: 1, fontFace: 'Bold', color: '0066CC',fontSize: 25});
      slide.addText('Score: '+slideInfo.score.toString(), { x: 1, y: 2, fontFace: 'Arial', fontSize: 20 });
      slide.addText('Status of the Functional Area: '+slideInfo.status, { x: 1, y: 3, fontFace: 'Arial', fontSize: 20 });
    });
    const questionData: { title: string; content: string; reponse: string, impact: string, effort: string }[] = [];
    //const slide1 = ppt.addSlide();
    this.getQuestionResponse.forEach(w=>{
      this.questionnaire.forEach(x=>{
        this.questions.forEach(y=> {
          if(x.questionId == y.questionId && w.questionnaireId == x.questionnaireId)
          {
            questionData.push({title:y.questionName,content: y.description,reponse: w.response, impact: w.impact, effort:w.effort});
          }
        })
      })
    });
    
    questionData.forEach((slideInfo, index) => {
      const slide = ppt.addSlide();
      slide.addText(slideInfo.title, { x: 1, y: 1, fontFace: 'Bold', color: '0066CC',fontSize: 25});
      slide.addText('Description: '+slideInfo.content, { x: 1, y: 2, fontFace: 'Arial', fontSize: 10 });
      slide.addText('Response: '+slideInfo.reponse, { x: 1, y: 3, fontFace: 'Arial', fontSize: 10 });
      slide.addText('Impact: '+slideInfo.impact, { x: 1, y: 4, fontFace: 'Arial', fontSize: 10 });
      slide.addText('Effort: '+slideInfo.effort, { x: 1, y: 5, fontFace: 'Arial', fontSize:10 });
    });
    ppt.writeFile({ fileName:'CustomerReport.pptx' });
    
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
  addNewQuestion(){
    this.router.navigate([`/addNewQuestion/${this.userId}/${this.projectId}/${this.userRoleId}`]);
  }
  notification():void{
    this.router.navigate([`/notification/${this.userId}/${this.userRoleId}`]);
  }
}
