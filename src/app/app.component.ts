import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItem, TopbarComponent } from './shared/components';

@Component({
  selector: 'sr-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule, TopbarComponent],
})
export class AppComponent {
  protected readonly appTitle = 'Start Rocking!';
  protected readonly navItems: NavItem[] = [
    { label: 'Artiesten', routerlink: '/artiesten' },
    { label: 'Playlists', routerlink: '/playlists' },
  ];
}
