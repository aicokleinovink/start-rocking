import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../input/input.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'sr-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrl: './playlist-form.component.scss',
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
})
export class PlaylistFormComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  protected readonly playlistSubmit = output<string>();

  protected readonly playlistForm = this.formBuilder.group({
    name: this.formBuilder.control('', { validators: Validators.required }),
  });

  protected onSubmit(): void {
    this.playlistSubmit.emit(this.playlistForm.getRawValue().name);
  }
}
