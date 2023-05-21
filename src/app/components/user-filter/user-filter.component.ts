import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent {

  constructor(private router: Router) { }
    doUserSearch(value: string) {
      this.router.navigateByUrl(`questions/user/${value}`).then();
    }
}
