import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { SpotifyAccessTokenResponse, SpotifyTracksResponse } from './models';
import { Song } from '../../models';

@Injectable({ providedIn: 'root' })
export class SpotifyService {
  private readonly http = inject(HttpClient);
  private accessToken: string | null = null;

  public async getAccessToken(): Promise<void> {
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: '5b92e62682df4fc498c07a14f9a53444',
      client_secret: '606d061c384745e88ea83dcc7df3c422',
    });

    const response = await firstValueFrom(
      this.http.post<SpotifyAccessTokenResponse>(tokenUrl, body, {
        headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded'),
      })
    );

    this.accessToken = response.access_token;
  }

  public getTracks(songs: Song[]): Promise<SpotifyTracksResponse | null> {
    const tracksUrl = 'https://api.spotify.com/v1/tracks';
    const trackIds = songs.map(({ spotifyId }) => spotifyId);
    const params = { ids: trackIds.join(',') };
    const headers = this.getAuthorizationHeader();

    return firstValueFrom(
      params.ids.length ? this.http.get<SpotifyTracksResponse>(tracksUrl, { params, headers }) : of(null)
    );
  }

  private getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().append('Authorization', `Bearer ${this.accessToken}`);
  }
}
