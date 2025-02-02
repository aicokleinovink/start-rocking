import { Component, input, output } from '@angular/core';

@Component({
  selector: 'sr-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  public readonly placeholder = input.required<string>();
  public readonly valueChange = output<string>();
}
