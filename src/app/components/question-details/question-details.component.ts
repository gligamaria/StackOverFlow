import { Component } from '@angular/core';
import {Question} from "../../common/question";
import {QuestionService} from "../../services/question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Tag} from "../../common/tag";
import {TagService} from "../../services/tag.service";
import {User} from "../../common/user";
import {AuthService} from "../../services/auth.service";
import {AnswerService} from "../../services/answer.service";
import {Answer} from "../../common/answer";
import {UserService} from "../../services/user.service";
import {EmailService} from "../../services/email.service";

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent {

  question!: Question;
  tags!: Tag[];
  user: User;
  safeDelete: String;
  answer: Answer;
  answerText: string;
  edit: boolean = false;
  tagList: String[];

  constructor(private questionService: QuestionService,
              private tagService: TagService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private answerService: AnswerService,
              private userService: UserService,
              private router: Router,
              private emailService: EmailService) {
    this.user = authService.getUserFromLocalStorage();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleQuestionDetails();
    })

  }

  addAnswer(){
    const  questionId: number = +this.route.snapshot.paramMap.get('id')!;
    this.questionService.getQuestion(questionId).subscribe(
      data => {
        this.question = data;
        console.log(this.question);
        this.answer = new Answer(-1, this.user,this.answerText,
          "corgi.png",0, new Date());
        this.answerService.addAnswer(this.answer, questionId).subscribe();
        this.questionService.addAnswer(this.answer, questionId);
      }
    )

  }

  deleteQuestion(){
    this.questionService.deleteQuestion(this.question.questionId).subscribe({
      complete: () => {
        this.router.navigateByUrl(`questions`).then();
      }
    });
  }

  private handleQuestionDetails() {

    const  questionId: number = +this.route.snapshot.paramMap.get('id')!;
      this.questionService.getQuestion(questionId).subscribe(
        data => {
          this.question = data;
        }
      )
      this.tagService.getTagListByQuestion(questionId).subscribe(
        data => {
          this.tags = data;
        }
      )
  }

  banUser(user: User) {
    user.bannedStatus = 1;
    this.userService.updateUser(user).subscribe();
    this.emailService.sendEmail(user).subscribe();
  }

  unbanUser(user: User) {
    user.bannedStatus = 0;
    this.userService.updateUser(user).subscribe();
  }

  getTags():String[]{
    this.tagService.getTitles().subscribe(
      data => {
        this.tagList = data;
      }
    );
    return this.tagList;
  }

  editQuestion() {
    this.edit = true;
  }
}
