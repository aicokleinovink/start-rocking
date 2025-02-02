import { Routes } from '@angular/router';

export const playlistsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./playlists.component').then((m) => m.PlaylistsComponent),
    title: 'Start Rocking! - Playlists',
  },
  {
    path: ':playlistId',
    loadComponent: () => import('./components/playlist/playlist.component').then((m) => m.PlaylistComponent),
    title: 'Start Rocking! - Playlist',
  },
];
