import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { HttpClientModule } from "@angular/common/http";
import { QuestionService } from "./services/question.service";

import { Routes, RouterModule} from "@angular/router";
import { SearchComponent } from './components/search/search.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { AnswerListComponent } from './components/answer-list/answer-list.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagSelectionComponent } from './components/tag-selection/tag-selection.component';

import { ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MaterialExampleModule } from './material.module';
import { NewQuestionComponent } from "./components/new-question/new-question.component";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule } from '@angular/forms';
import {UserFilterComponent} from "./components/user-filter/user-filter.component";


const routes: Routes= [
  {path: 'login', component: LoginComponent},
  {path: 'questions/:id', component: QuestionDetailsComponent},
  {path: 'questions/user/:user', component: QuestionListComponent},
  {path: 'search/:keyword', component: QuestionListComponent},
  {path: 'questions', component: QuestionListComponent},
  {path: 'users', component: UserFilterComponent},
  {path: 'new/question', component: NewQuestionComponent},
  {path: 'tags', component: TagListComponent},
  {path: '', redirectTo: '/questions', pathMatch: 'full'},
  {path: '**', redirectTo: '/questions', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    QuestionListComponent,
    SearchComponent,
    QuestionDetailsComponent,
    AnswerListComponent,
    TagListComponent,
    TagSelectionComponent,
    NewQuestionComponent,
    LoginComponent,
    UserFilterComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatListModule,
    MaterialExampleModule,
    FormsModule
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
