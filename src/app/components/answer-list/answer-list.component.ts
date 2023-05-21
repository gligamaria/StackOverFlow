import { Component } from '@angular/core';
import {Answer} from "../../common/answer";
import {AnswerService} from "../../services/answer.service";

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent {

  answers: Answer[];

  constructor(private answerService: AnswerService) { }

  ngOnInit(){
    this.listAnswers();
  }

  listAnswers(){

    this.answerService.getAnswerList().subscribe(
      data => {
        this.answers = data;
      }
    )
  }

}
