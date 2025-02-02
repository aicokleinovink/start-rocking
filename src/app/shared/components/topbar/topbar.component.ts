import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  routerlink: string;
}

@Component({
  selector: 'sr-topbar',
  templateUrl: 'topbar.component.html',
  styleUrl: 'topbar.component.scss',
  imports: [RouterModule],
})
export class TopbarComponent {
  public readonly appTitle = input.required<string>();
  public readonly navItems = input.required<NavItem[]>();
}
