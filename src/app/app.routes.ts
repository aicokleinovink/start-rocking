import { Route } from '@angular/router';
import { artistsRoutes } from './feature-artists/artists.routes';
import { ArtistsService } from './feature-artists/services/artists.service';

export const appRoutes: Route[] = [
  {
    path: 'artiesten',
    providers: [ArtistsService],
    children: [...artistsRoutes],
  },
  {
    path: '**',
    redirectTo: 'artiesten',
  },
];
