import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { QuickLinksComponent } from './quick-links/quick-links.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AddNewPRojectComponent } from './components/add-new-project/add-new-project.component';
import { HeaderComponent } from './components/header/header.component';
import { NgLocalization } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown/ng-multiselect-dropdown.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersComponent } from './components/users/users.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddUserComponent } from './components/add-user/add-user.component';
import { SetupQuestionnaireComponent } from './components/setup-questionnaire/setup-questionnaire.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { RegisterComponent } from './components/register/register.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AddNewQuestionComponent } from './components/add-new-question/add-new-question.component';
import { ScatterplotComponent } from './components/scatterplot/scatterplot.component';
import { PlotlyViaWindowModule } from 'angular-plotly.js';
import { IgxLegendModule} from 'igniteui-angular-charts';
import { Chart,registerables } from 'chart.js';
Chart.register(...registerables);
@NgModule({
  declarations: [
    AppComponent,
    QuickLinksComponent,
    LoginComponent,
    HomeComponent,
    ContactComponent,
    AddNewPRojectComponent,
    HeaderComponent,
    UsersComponent,
    AddUserComponent,
    SetupQuestionnaireComponent,
    QuestionsComponent,
    RegisterComponent,
    NotificationsComponent,
    AddNewQuestionComponent,
    ScatterplotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    MatCheckboxModule,
    IgxLegendModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
