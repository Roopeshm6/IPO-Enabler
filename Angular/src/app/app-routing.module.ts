import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { AddNewPRojectComponent } from './components/add-new-project/add-new-project.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { SetupQuestionnaireComponent } from './components/setup-questionnaire/setup-questionnaire.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { RegisterComponent } from './components/register/register.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AddNewQuestionComponent } from './components/add-new-question/add-new-question.component';
import { ScatterplotComponent } from './components/scatterplot/scatterplot.component';
import { Chart } from 'chart.js';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home/:userId',component:HomeComponent},
  {path:'contact/:userId/:userRoleId',component:ContactComponent},
  {path:'notification/:userId/:userRoleId',component:NotificationsComponent},
  {path:'addNewProject/:userId/:userRoleId',component:AddNewPRojectComponent},
  {path:'addNewQuestion/:userId/:userProjectId/:userRoleId',component:AddNewQuestionComponent},
  {path:'users/:userId/:userRoleId',component:UsersComponent},
  {path:'addUser/:userId/:userRoleId',component:AddUserComponent},
  {path:'setupQuestionnaire/:userId/:userProjectId/:userRoleId',component:SetupQuestionnaireComponent},
  {path:'questions/:userId/:userProjectId/:userRoleId',component:QuestionsComponent},
  {path:'scatterplot/:userId/:userProjectId/:userRoleId',component:ScatterplotComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
