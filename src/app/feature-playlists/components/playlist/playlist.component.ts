import { Component, input } from '@angular/core';

@Component({
  selector: 'sr-playlist',
  templateUrl: './playlist.component.html',
})
export class PlaylistComponent {
  public readonly playlistId = input.required<string>();
}
