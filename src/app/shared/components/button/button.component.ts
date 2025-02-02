import { Component, input } from '@angular/core';

@Component({
  selector: 'sr-button',
  templateUrl: 'button.component.html',
  styleUrl: 'button.component.scss',
})
export class ButtonComponent {
  public readonly label = input.required<string>();
  public readonly color = input<'primary' | 'secondary'>('primary');
  public readonly disabled = input(false);
}
