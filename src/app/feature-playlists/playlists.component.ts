import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { AlertComponent, ListModule } from '../shared/components';
import { PlaylistsStore } from '../shared/store';

@Component({
  selector: 'sr-playlists',
  templateUrl: 'playlists.component.html',
  imports: [ListModule, AlertComponent],
})
export class PlaylistsComponent {
  protected readonly playlistsStore = inject(PlaylistsStore);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected readonly playlistForm = this.formBuilder.group({
    name: this.formBuilder.control(''),
  });
}
