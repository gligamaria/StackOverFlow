import { Component } from '@angular/core';
import {Tag} from "../../common/tag";
import {AnswerService} from "../../services/answer.service";
import {TagService} from "../../services/tag.service";

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent {

  tags: Tag[];
  constructor(private tagService: TagService) { }

  ngOnInit(){
    this.listTags();
  }

  listTags(){
    this.tagService.getTagList().subscribe(
      data => {
        this.tags = data;
      }
    )
  }
}
