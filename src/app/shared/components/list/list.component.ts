import { Component, contentChildren } from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sr-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',

  imports: [RouterModule, CommonModule],
})
export class ListComponent {
  protected readonly listItems = contentChildren(ListItemComponent);
}
