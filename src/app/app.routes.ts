import { Route } from '@angular/router';
import { artistsRoutes } from './feature-artists/artists.routes';
import { playlistsRoutes } from './feature-playlists/playlists.routes';

export const appRoutes: Route[] = [
  ...artistsRoutes,
  ...playlistsRoutes,
  {
    path: '**',
    redirectTo: 'artiesten',
  },
];
