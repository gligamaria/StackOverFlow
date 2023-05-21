import {Component, ElementRef, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipEditedEvent, MatChipInputEvent} from "@angular/material/chips";
import {FormControl} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

class placeholderTag {
  name: String;
}

@Component({
  selector: 'app-tag-selection',
  templateUrl: './tag-selection.component.html',
  styleUrls: ['./tag-selection.component.css']
})

  export class TagSelectionComponent {
    separatorKeysCodes: number[] = [ENTER, COMMA];
    tagCtrl = new FormControl('');
    filteredTags: Observable<string[]>;
    tags: string[] = [];
    allTags: string[] = ['Corgi', 'Pez', 'Maxine The Fluffy Corgi'];

    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

    constructor() {
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allTags.slice())),
      );
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

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();

      return this.allTags.filter(fruit => fruit.toLowerCase().includes(filterValue));
    }
  }
