import { TestBed } from '@angular/core/testing';
import { ArtistsService } from './artists.service';
import { HttpClient } from '@angular/common/http';
import { apiBaseUrl } from 'src/app/shared/constants';
import { of } from 'rxjs';
import { Artist } from 'src/app/shared/models';

describe(ArtistsService.name, () => {
  const httpClientMock = { get: jest.fn() };
  let service: ArtistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtistsService, { provide: HttpClient, useValue: httpClientMock }],
    });

    service = TestBed.inject(ArtistsService);
    httpClientMock.get.mockClear();
  });

  describe('getArtists', () => {
    const artistsMocked: Artist[] = [
      {
        id: '760',
        name: '"Weird Al" Yankovic',
      },
    ];

    it('should fetch artists', async () => {
      httpClientMock.get.mockReturnValue(of(artistsMocked));
      const result = await service.getArtists();

      expect(httpClientMock.get).toHaveBeenCalledWith(`${apiBaseUrl}/artists`);
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(artistsMocked);
    });

    it('should fetch artists only once and return cached value', async () => {
      await service.getArtists();
      const result = await service.getArtists();

      expect(result).toBe(artistsMocked);
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    });
  });
});
