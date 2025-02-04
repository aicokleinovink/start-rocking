import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Playlist } from '../../models';
import { ButtonComponent } from '../button/button.component';
import { ListModule } from '../list/list.module';
import { PlaylistFormComponent } from './playlist-form/playlist-form.component';

@Component({
  selector: 'sr-playlist-widget',
  templateUrl: 'playlist-widget.component.html',
  styleUrl: 'playlist-widget.component.scss',
  imports: [ReactiveFormsModule, PlaylistFormComponent, ListModule, ButtonComponent],
})
export class PlaylistWidgetComponent {
  public readonly playlists = input.required<Playlist[]>();
  public readonly newPlaylist = output<string>();
  public readonly existingPlaylist = output<Playlist>();
  public readonly close = output<void>();
}
