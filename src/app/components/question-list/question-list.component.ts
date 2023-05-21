import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {Question} from "../../common/question";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list-table.component.html',
  //templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit{

  questions: Question[];
  searchMode: boolean;
  userMode: boolean;

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe(() =>{
      this.listQuestions();
    });
  }

  listQuestions(){

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.userMode = this.route.snapshot.paramMap.has('user');

    if(this.searchMode){
      this.handleSearchQuestions();
    }
    else if (this.userMode) {
      this.handleSearchQuestionsByUser();
    }
    else {
      this.handleListQuestions();
    }
    }

  handleListQuestions(){
    this.questionService.getQuestionList().subscribe(
      data => {
        this.questions = data;
      }
    )
  }

  handleSearchQuestions(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.questionService.searchQuestions(theKeyword).subscribe(
      data => {
        this.questions = data;
      }
    )
  }

  private handleSearchQuestionsByUser() {
    const theUser: string = this.route.snapshot.paramMap.get('user')!;

    console.log(theUser);

    this.questionService.searchQuestionsByUser(theUser).subscribe(
      data => {
        this.questions = data;
      }
    )
  }
}
