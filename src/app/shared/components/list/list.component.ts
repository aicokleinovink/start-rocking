import { CommonModule } from '@angular/common';
import { Component, contentChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListItemComponent } from './list-item/list-item.component';

@Component({
  selector: 'sr-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [RouterModule, CommonModule, FontAwesomeModule],
})
export class ListComponent {
  protected readonly listItems = contentChildren(ListItemComponent);
}
