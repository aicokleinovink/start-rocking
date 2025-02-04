import { Component, inject, input, resource } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { AlbumComponent, AlertComponent, ListModule, PlaylistWidgetComponent } from '../../../shared/components';
import { Playlist, Song } from '../../../shared/models';
import { SpotifyService } from '../../../shared/services';
import { PlaylistsStore } from '../../../shared/store';
import { SongsService } from '../../services/songs/songs.service';

interface ComponentState {
  playlistWidgetEnabled: boolean;
  selectedSong: Song | null;
}

@Component({
  selector: 'sr-artist',
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
  imports: [ListModule, AlertComponent, PlaylistWidgetComponent, AlbumComponent],
})
export class ArtistComponent {
  private readonly songsService = inject(SongsService);
  private readonly spotifyService = inject(SpotifyService);
  protected readonly playlistsStore = inject(PlaylistsStore);
  public readonly artistName = input.required<string>();

  protected readonly songsResource = resource({
    request: () => ({ artistName: this.artistName() }),
    loader: ({ request }) => this.songsService.getSongsByArtist(request.artistName),
  });

  protected readonly albumsResource = resource({
    request: () => ({ songs: this.songsResource.value() ?? [] }),
    loader: ({ request }) => this.spotifyService.getAlbumnsBySongs(request.songs),
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
}
