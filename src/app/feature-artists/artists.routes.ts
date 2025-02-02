import { Routes } from '@angular/router';

export const artistsRoutes: Routes = [
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
];
