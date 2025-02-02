import { Component, computed, inject, resource, signal } from '@angular/core';
import { ArtistsService } from './services/artists.service';
import { Artist } from '../shared/models';
import { AlertComponent, InputComponent, ListModule } from '../shared/components';

@Component({
  selector: 'sr-artists',
  templateUrl: './artists.component.html',
  imports: [ListModule, InputComponent, AlertComponent],
})
export class ArtistsComponent {
  private readonly artistsService = inject(ArtistsService);
  protected readonly searchValue = signal('');
  protected readonly filteredArtists = computed(() => this.getFilteredArtists());
  protected readonly artistsResource = resource({
    loader: () => this.artistsService.getArtists(),
  });

  private getFilteredArtists(): Artist[] {
    const searchValue = this.searchValue().toLowerCase();
    const artists = this.artistsResource.value() ?? [];

    return searchValue ? artists.filter(({ name }) => name.toLowerCase().includes(searchValue)) : artists;
  }
}
