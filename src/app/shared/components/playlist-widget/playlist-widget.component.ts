import { Component, inject, input, output } from '@angular/core';
import { Playlist } from '../../models';
import { InputComponent } from '../input/input.component';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListModule } from '../list/list.module';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'sr-playlist-widget',
  templateUrl: 'playlist-widget.component.html',
  styleUrl: 'playlist-widget.component.scss',
  imports: [ReactiveFormsModule, ListModule, InputComponent, ButtonComponent],
})
export class PlaylistWidgetComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  public readonly playlists = input.required<Playlist[]>();
  public readonly newPlaylist = output<string>();
  public readonly existingPlaylist = output<Playlist>();
  public readonly close = output<void>();

  protected readonly playlistForm = this.formBuilder.group({
    name: this.formBuilder.control('', { validators: Validators.required }),
  });

  protected onNewPlaylistSubmit(): void {
    this.newPlaylist.emit(this.playlistForm.controls.name.value);
  }

  protected onExistingPlaylistSelect(playlist: Playlist): void {
    this.existingPlaylist.emit(playlist);
  }

  protected onCancel(): void {
    this.close.emit();
  }
}
