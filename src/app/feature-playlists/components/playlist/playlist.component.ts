import { Component, computed, inject, input } from '@angular/core';
import { PlaylistsStore } from '../../../shared/store';
import { AlertComponent, ListModule } from '../../../shared/components';
import { Playlist, Song } from '../../../shared/models';

@Component({
  selector: 'sr-playlist',
  templateUrl: 'playlist.component.html',
  imports: [ListModule, AlertComponent],
})
export class PlaylistComponent {
  private readonly playlistsStore = inject(PlaylistsStore);
  public readonly playlistId = input.required<string>();
  protected readonly playlist = computed(() => this.getPlaylist());

  protected deleteFromPlaylist(playlist: Playlist, song: Song): void {
    const updatedPlaylist: Playlist = {
      ...playlist,
      songs: playlist.songs.filter((s) => s.id !== song.id),
    };
    this.playlistsStore.patch({ playlist: updatedPlaylist });
  }

  private getPlaylist(): Playlist | undefined {
    return this.playlistsStore.entityMap()[this.playlistId()];
  }
}
