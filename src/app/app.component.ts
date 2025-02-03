import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItem, TopbarComponent } from './shared/components';
import { SpotifyService } from './shared/services';

@Component({
  selector: 'sr-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule, TopbarComponent],
})
export class AppComponent implements OnInit {
  private readonly spotifyService = inject(SpotifyService);
  protected readonly appTitle = 'Start Rocking!';
  protected readonly navItems: NavItem[] = [
    { label: 'Artiesten', routerlink: '/artiesten' },
    { label: 'Playlists', routerlink: '/playlists' },
  ];

  public ngOnInit(): void {
    this.spotifyService.getAccessToken();
  }
}
