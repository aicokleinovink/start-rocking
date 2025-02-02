import { Component, input } from '@angular/core';

@Component({
  selector: 'sr-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  public readonly message = input.required<string>();
  public readonly severity = input.required<'info' | 'error'>();
}
