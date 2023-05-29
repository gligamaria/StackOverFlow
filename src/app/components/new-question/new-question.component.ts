import {Component, ElementRef, ViewChild, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl} from '@angular/forms';
import {User} from "../../common/user";
import {Question} from "../../common/question";
import {AuthService} from "../../services/auth.service";
import {Answer} from "../../common/answer";
import {Tag} from "../../common/tag";
import {QuestionService} from "../../services/question.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {TagService} from "../../services/tag.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent {

  fileName = '';
  question: Question;
  user: User;
  date: Date;
  answers: Answer[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<String[]>;
  allRealTags: Tag[];
  someTags: Tag[];
  tags: string[] = [];
  allTags: String[];
  submitPressed: boolean = false;
  fileUrl: string | null = null;
  @Input() buttonText: string = "Ask question";
  @Input() titleInputValue: string;
  @Input() descriptionInputValue: string;
  @Input() updateQuestion: boolean;
  @Input() givenQuestion: Question;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private questionService: QuestionService,
              private tagService: TagService,
              private router: Router) {
    this.user = authService.getUserFromLocalStorage();
    this.date = new Date();
    this.tagService.getTagList().subscribe(
      data => {
        this.allRealTags = data;

      }
    );
    this.tagService.getTitles().subscribe(
      data => {
        this.allTags = data;
      }
    )
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allTags)),
    );
  }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      const upload$ = this.http.post("http://localhost:8080/api/thumbnail-upload", formData);
      upload$.subscribe();
    }
  }

  onSubmit() {
    if(this.updateQuestion){
      this.question = new Question(-1 ,this.user,this.titleInputValue,this.descriptionInputValue,
        "picture",0, this.date, this.answers, this.someTags);
      this.questionService.addTags(this.tags).subscribe(
        data => {
          this.someTags = data;
          this.question.questionTags = this.someTags;
          this.questionService.updateQuestion(this.givenQuestion.questionId, this.question).subscribe();
          this.router.navigateByUrl(`/questions`).then();

        }
      )
    }
    else{
      this.question = new Question(-1 ,this.user,this.titleInputValue,this.descriptionInputValue,
        "picture",0, this.date, this.answers, this.someTags);

      this.questionService.addTags(this.tags).subscribe(
        data => {
          this.someTags = data;
          this.question.questionTags = this.someTags;
          this.questionService.addQuestion(this.question).subscribe();
          this.router.navigateByUrl(`/questions`).then();
        }
      );
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    let isValuePresent: boolean = false;

    if (value) {
      for (const tag of this.tags) {
        if (tag == value) {
          isValuePresent = true;
          break;
        }
      }
      if(!isValuePresent){
        this.tags.push(value);
      }
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}
