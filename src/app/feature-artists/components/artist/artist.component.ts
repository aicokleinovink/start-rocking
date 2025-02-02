import { Component, inject, input, resource } from '@angular/core';
import { AlertComponent, ListModule, PlaylistWidgetComponent } from '../../../shared/components';
import { Playlist, Song } from '../../../shared/models';
import { PlaylistsStore } from '../../../shared/store';
import { patchState, signalState } from '@ngrx/signals';
import { SongsService } from '../../services/songs.service';

interface ComponentState {
  playlistWidgetEnabled: boolean;
  selectedSong: Song | null;
}

@Component({
  selector: 'sr-artist',
  templateUrl: './artist.component.html',
  imports: [ListModule, AlertComponent, PlaylistWidgetComponent],
})
export class ArtistComponent {
  private readonly songsService = inject(SongsService);
  public readonly artistName = input.required<string>();
  protected readonly playlistsStore = inject(PlaylistsStore);

  protected readonly songsResource = resource({
    request: () => ({ artistName: this.artistName() }),
    loader: ({ request }) => this.getSongsByArtist(request.artistName),
  });

  protected readonly state = signalState<ComponentState>({
    playlistWidgetEnabled: false,
    selectedSong: null,
  });

  protected openPlaylistWidget(song: Song): void {
    patchState(this.state, { playlistWidgetEnabled: true, selectedSong: song });
  }

  protected closePlaylistWidget(): void {
    patchState(this.state, { playlistWidgetEnabled: false, selectedSong: null });
  }

  protected addToNewPlaylist(name: string): void {
    const song = this.state.selectedSong();

    if (song) {
      this.playlistsStore.create({ name, song });
    }

    this.closePlaylistWidget();
  }

  protected addToExistingPlaylist(playlist: Playlist): void {
    const song = this.state.selectedSong();

    if (song && !playlist.songs.find(({ id }) => id === song.id)) {
      const updatedPlaylist: Playlist = {
        ...playlist,
        songs: [...playlist.songs, song],
      };
      this.playlistsStore.patch({ playlist: updatedPlaylist });
    }

    this.closePlaylistWidget();
  }

  private getSongsByArtist(artistName: string): Promise<Song[]> {
    return this.songsService.getSongsByArtist(artistName);
  }
}
