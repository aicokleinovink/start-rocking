import { Component, input } from '@angular/core';
import { Album } from '../../models';

@Component({
  selector: 'sr-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent {
  public readonly album = input.required<Album>();
}
