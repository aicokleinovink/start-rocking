import { Route } from '@angular/router';
import { artistsRoutes } from './feature-artists/artists.routes';
import { ArtistsService } from './feature-artists/services/artists.service';
import { playlistsRoutes } from './feature-playlists/playlists.routes';
import { SongsService } from './feature-artists/services/songs.service';

export const appRoutes: Route[] = [
  {
    path: 'artiesten',
    providers: [ArtistsService, SongsService],
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
