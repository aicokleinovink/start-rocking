import { Component, inject, input } from '@angular/core';
import { PlaylistsStore } from '../../../shared/store';
import { AlertComponent, ListModule } from '../../../shared/components';
import { Playlist, Song } from '../../../shared/models';

@Component({
  selector: 'sr-playlist',
  templateUrl: 'playlist.component.html',
  imports: [ListModule, AlertComponent],
})
export class PlaylistComponent {
  public readonly playlistId = input.required<string>();
  protected readonly playlistsStore = inject(PlaylistsStore);

  protected deleteFromPlaylist(playlist: Playlist, song: Song): void {
    this.playlistsStore.patch({ playlist: { 
      ...playlist, 
      songs: playlist.songs.filter((s) => s.id !== song.id)} 
    });
  }
}
