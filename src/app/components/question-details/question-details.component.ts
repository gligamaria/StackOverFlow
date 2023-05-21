import { Component } from '@angular/core';
import {Question} from "../../common/question";
import {QuestionService} from "../../services/question.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent {

  question: Question = new Question();

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleQuestionDetails();
    })
  }

  private handleQuestionDetails() {

    // @ts-ignore
    const  questionId: number = +this.route.snapshot.paramMap.get('id');

      this.questionService.getQuestion(questionId).subscribe(
        data => {
          this.question = data;
        }
      )
  }
}
