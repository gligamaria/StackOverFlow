import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {Question} from "../../common/question";
import {ActivatedRoute} from "@angular/router";
import {TagService} from "../../services/tag.service";
import {Tag} from "../../common/tag";
import {Observable} from "rxjs";
import {User} from "../../common/user";
import {AuthService} from "../../services/auth.service";
import {AnswerVote} from "../../common/answer-vote";
import {QuestionVote} from "../../common/question-vote";
import {QuestionVoteService} from "../../services/question-vote.service";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list-table.component.html',
  //templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit{

  questions: Question[];
  user: User;
  searchMode: boolean;
  userMode: boolean;
  tagMode: boolean;
  myQuestion: Question;
  questionVote: QuestionVote;

  constructor(private questionService: QuestionService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private questionVoteService: QuestionVoteService) {
    this.user = authService.getUserFromLocalStorage();
  }

  ngOnInit(){
    this.route.paramMap.subscribe(() =>{
      this.listQuestions();
    });
  }

  listQuestions(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.userMode = this.route.snapshot.paramMap.has('user');
    this.tagMode = this.route.snapshot.paramMap.has('tag');

    if(this.searchMode){
      this.handleSearchQuestions();
    }
    else if (this.userMode) {
      this.handleSearchQuestionsByUser();
    }
    else if (this.tagMode) {
      this.handleListQuestionsByTag()
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

  handleListQuestionsByTag(){
    const tag: string = this.route.snapshot.paramMap.get('tag')!;

    this.questionService.searchQuestionsByTag(tag).subscribe(
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

    this.questionService.searchQuestionsByUser(theUser).subscribe(
      data => {
        this.questions = data;
      }
    )
  }

  addLike(questionId: number){
    this.questionService.getQuestion(questionId).subscribe({
      next: data => {
        console.log(data)
        this.myQuestion = data;
        this.questionVote = new QuestionVote(-1, this.myQuestion, this.user,1);
        this.questionVoteService.addVote(this.questionVote).subscribe({
          complete: () => window.location.reload()
        });
      }}
    )
  }


  addDislike(questionId: number){
    this.questionService.getQuestion(questionId).subscribe({
      next: data => {
        console.log(data)
        this.myQuestion = data;
        this.questionVote = new QuestionVote(-1, this.myQuestion, this.user,-1);
        this.questionVoteService.addVote(this.questionVote).subscribe({
          complete: () => window.location.reload()
        });
      }}
    )
  }

  checkForVote(userId: number, answerId: number): number {
    this.questionVoteService.checkForVote(userId, answerId).subscribe(
      data => {
        this.questionVote = data;
      }
    );
    if(this.questionVote){
      return this.questionVote.voteType;
    }
    else return 0;
  }
}
