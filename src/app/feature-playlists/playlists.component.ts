import { Component, inject } from '@angular/core';
import { AlertComponent, ListModule, PlaylistFormComponent } from '../shared/components';
import { PlaylistsStore } from '../shared/store';

@Component({
  selector: 'sr-playlists',
  templateUrl: 'playlists.component.html',
  imports: [ListModule, AlertComponent, PlaylistFormComponent],
})
export class PlaylistsComponent {
  protected readonly playlistsStore = inject(PlaylistsStore);

  protected createPlaylist(name: string): void {
    this.playlistsStore.create({ name });
  }
}
