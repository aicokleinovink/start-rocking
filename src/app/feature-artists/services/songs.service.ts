import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { apiBaseUrl } from '../../shared/constants';
import { Song } from '../../shared/models/song';

@Injectable()
export class SongsService {
  private readonly http = inject(HttpClient);

  public getSongsByArtist(artist: string): Promise<Song[]> {
    return firstValueFrom(this.http.get<Song[]>(`${apiBaseUrl}/songs`, { params: { artist } }));
  }
}
