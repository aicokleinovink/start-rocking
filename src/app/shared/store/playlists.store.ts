import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { addEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { apiBaseUrl } from '../constants';
import { Playlist, Song } from '../models';

export const PlaylistsStore = signalStore(
  { providedIn: 'root' },
  withEntities<Playlist>(),

  withMethods((state, http = inject(HttpClient)) => ({
    loadAll: rxMethod<void>(
      pipe(
        switchMap(() => {
          return http.get<Playlist[]>(`${apiBaseUrl}/playlists`).pipe(
            tapResponse({
              next: (playlists) => patchState(state, setAllEntities(playlists)),
              error: (error) => console.error(error),
            })
          );
        })
      )
    ),

    create: rxMethod<{ name: string; song: Song }>(
      pipe(
        switchMap(({ name, song }) => {
          return http.post<Playlist>(`${apiBaseUrl}/playlists`, { name, songs: [song] }).pipe(
            tapResponse({
              next: (playlist) => patchState(state, addEntity(playlist)),
              error: (error) => console.error(error),
            })
          );
        })
      )
    ),

    patch: rxMethod<{ playlist: Playlist }>(
      pipe(
        switchMap(({ playlist }) => {
          const { id, ...toUpdate } = playlist;
          return http.patch<Playlist>(`${apiBaseUrl}/playlists/${id}`, toUpdate).pipe(
            tapResponse({
              next: ({ id, ...changes }) => patchState(state, updateEntity({ id, changes })),
              error: (error) => console.error(error),
            })
          );
        })
      )
    ),
  })),

  withHooks({
    onInit: ({ loadAll }) => loadAll(),
  })
);
