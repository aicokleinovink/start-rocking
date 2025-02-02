import { Component, input } from '@angular/core';

@Component({
  selector: 'sr-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent {
  public readonly artistName = input.required<string>();
}
