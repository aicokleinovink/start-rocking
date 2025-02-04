import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, map, of } from 'rxjs';
import { Album, Song } from '../../models';
import { SpotifyAccessTokenResponse, SpotifyTracksResponse } from './models';

@Injectable({ providedIn: 'root' })
export class SpotifyService {
  private readonly http = inject(HttpClient);
  private accessToken: string | null = null;

  public async getAccessToken(): Promise<void> {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const headers = new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: '5b92e62682df4fc498c07a14f9a53444',
      client_secret: '606d061c384745e88ea83dcc7df3c422',
    });

    const response = await firstValueFrom(this.http.post<SpotifyAccessTokenResponse>(tokenUrl, body, { headers }));
    this.accessToken = response.access_token;
  }

  public getAlbumnsBySongs(songs: Song[]): Promise<Album[]> {
    const tracksUrl = 'https://api.spotify.com/v1/tracks';
    const trackIds = songs.map(({ spotifyId }) => spotifyId);
    const params = { ids: trackIds.join(',') };
    const headers = this.getAuthorizationHeader();

    return firstValueFrom(
      params.ids.length
        ? this.http.get<SpotifyTracksResponse>(tracksUrl, { params, headers }).pipe(map((data) => this.getAlbums(data)))
        : of([])
    );
  }

  private getAlbums(data: SpotifyTracksResponse | null): Album[] {
    return (data?.tracks ?? []).reduce<Album[]>((albums, track) => {
      const isDuplicate = albums.some(({ name }) => name === track.album.name);
      const hasImages = track.album.images.length > 0;

      return isDuplicate || !hasImages
        ? albums
        : [...albums, { name: track.album.name, imageUrl: track.album.images[0].url }];
    }, []);
  }

  private getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().append('Authorization', `Bearer ${this.accessToken}`);
  }
}
