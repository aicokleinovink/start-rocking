import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SongsService } from './songs.service';
import { Song } from 'src/app/shared/models';
import { of } from 'rxjs';
import { apiBaseUrl } from 'src/app/shared/constants';

describe(SongsService.name, () => {
  const httpClientMock = { get: jest.fn() };
  let service: SongsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SongsService, { provide: HttpClient, useValue: httpClientMock }],
    });

    service = TestBed.inject(SongsService);
  });

  describe('getSongsByArtist', () => {
    it('should fetch songs for the given artist', async () => {
      const artist = 'artist';
      const songsMocked: Song[] = [
        {
          id: '190',
          name: "(Don't Fear) The Reaper",
          year: 1975,
          artist: 'Blue Öyster Cult',
          shortname: 'dontfearthereaper',
          bpm: 141,
          duration: 322822,
          genre: 'Classic Rock',
          spotifyId: '5QTxFnGygVM4jFQiBovmRo',
          album: 'Agents of Fortune',
        },
      ];

      httpClientMock.get.mockReturnValue(of(songsMocked));
      const result = await service.getSongsByArtist(artist);

      expect(httpClientMock.get).toHaveBeenCalledWith(`${apiBaseUrl}/songs`, { params: { artist } });
      expect(result).toEqual(songsMocked);
    });
  });
});
