import { Component } from '@angular/core';
import {Answer} from "../../common/answer";
import {AnswerService} from "../../services/answer.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../common/user";
import {AuthService} from "../../services/auth.service";
import {AnswerVoteService} from "../../services/answer-vote.service";
import {AnswerVote} from "../../common/answer-vote";

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent {

  answers: Answer[];
  answerVotes: AnswerVote[];
  user: User;
  private myAnswer: Answer;
  private myUser: User;
  private answerVote: AnswerVote;
  public edit: boolean = false;
  answerText: string;

  constructor(private answerService: AnswerService,
              private answerVoteService: AnswerVoteService,
              private authService: AuthService,
              private route: ActivatedRoute) {
    this.user = authService.getUserFromLocalStorage();
  }

  ngOnInit(){
    this.route.paramMap.subscribe(() => {
      this.listAnswers();
    })
  }

  editAnswer(tempAnswer: any) {
    tempAnswer.editing = true;
  }

  listAnswers(){
    const questionId: number = +this.route.snapshot.paramMap.get('id')!;
    this.answerService.getAnswerList(questionId).subscribe(
      data => {
        this.answers = data;
      }
    )
  }

  addLike(answerId: number){
    this.answerService.getAnswerByID(answerId).subscribe({
      next: data => {
      console.log(data)
      this.myAnswer = data;
      this.myUser = this.authService.getUserFromLocalStorage();
      this.answerVote = new AnswerVote(-1, this.myAnswer, this.myUser,1);
      this.answerVoteService.addVote(this.answerVote).subscribe({
        complete: () => window.location.reload()
      });
    }}
    )
  }

  addDislike(answerId: number){
    this.answerService.getAnswerByID(answerId).subscribe(
      data => {
        console.log(data)
        this.myAnswer = data;
        this.myUser = this.authService.getUserFromLocalStorage();
        this.answerVote = new AnswerVote(-1, this.myAnswer, this.myUser,-1);
        this.answerVoteService.addVote(this.answerVote).subscribe({
          complete: () => window.location.reload()
        });
      }
    )
  }

  deleteAnswer(answerId: number){
    this.answerService.deleteAnswer(answerId).subscribe({
      complete: () => window.location.reload()
    });
  }

  checkForVote(userId: number, answerId: number): number {
    this.answerVoteService.checkForVote(userId, answerId).subscribe(
      data => {
        this.answerVote = data;
      }
    );
    if(this.answerVote){
      return this.answerVote.voteType;
    }
    else return 0;
  }

  refreshPage(): void {
    location.reload();
  }

  updateAnswer(oldAnswer: Answer) {
    oldAnswer.text = this.answerText;
    this.answerService.updateAnswer(oldAnswer.answerId, oldAnswer).subscribe();
    oldAnswer.editing = false;
    location.reload();
  }
}
