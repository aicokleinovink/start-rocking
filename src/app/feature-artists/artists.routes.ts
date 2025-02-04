import { Routes } from '@angular/router';
import { ArtistsService } from './services/artists/artists.service';
import { SongsService } from './services/songs/songs.service';

export const artistsRoutes: Routes = [
  {
    path: 'artiesten',
    providers: [ArtistsService, SongsService],
    children: [
      {
        path: '',
        loadComponent: () => import('./artists.component').then((m) => m.ArtistsComponent),
        title: 'Start Rocking! - Artiesten',
      },
      {
        path: ':artistName',
        loadComponent: () => import('./components/artist/artist.component').then((m) => m.ArtistComponent),
        title: 'Start Rocking! - Artiest',
      },
    ],
  },
];
