import { Component, computed, input, output } from '@angular/core';
import { IconDefinition } from '@fortawesome/angular-fontawesome';
import { faForward, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sr-list-item',
  template: '',
})
export class ListItemComponent {
  public readonly label = input.required<string>();
  public readonly routerLink = input<string | (string | number)[]>();
  public readonly iconType = input<'link' | 'add' | 'delete'>('link');
  public readonly select = output<void>();
  public readonly icon = computed(() => this.getIcon());

  private getIcon(): IconDefinition {
    switch (this.iconType()) {
      default:
      case 'link':
        return faForward;
      case 'add':
        return faPlus;
      case 'delete':
        return faXmark;
    }
  }
}
