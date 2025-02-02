import { Route } from '@angular/router';
import { artistsRoutes } from './feature-artists/artists.routes';
import { ArtistsService } from './feature-artists/services/artists.service';
import { playlistsRoutes } from './feature-playlists/playlists.routes';

export const appRoutes: Route[] = [
  {
    path: 'artiesten',
    providers: [ArtistsService],
    children: [...artistsRoutes],
  },
  {
    path: 'playlists',
    children: [...playlistsRoutes],
  },
  {
    path: '**',
    redirectTo: 'artiesten',
  },
];
