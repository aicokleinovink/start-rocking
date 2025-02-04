import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, of, tap } from 'rxjs';
import { apiBaseUrl } from '../../../shared/constants';
import { Artist } from '../../../shared/models';

@Injectable()
export class ArtistsService {
  private readonly http = inject(HttpClient);
  private cached: Artist[] | null = null;

  public getArtists(): Promise<Artist[]> {
    return firstValueFrom(
      this.cached
        ? of(this.cached)
        : this.http.get<Artist[]>(`${apiBaseUrl}/artists`).pipe(tap((data) => (this.cached = data)))
    );
  }
}
