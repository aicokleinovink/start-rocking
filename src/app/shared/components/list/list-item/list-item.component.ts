import { Component, input, output } from '@angular/core';

@Component({
  selector: 'sr-list-item',
  template: '',
})
export class ListItemComponent {
  public readonly label = input.required<string>();
  public readonly routerLink = input<string | (string | number)[]>();
  public readonly select = output<void>();
}
