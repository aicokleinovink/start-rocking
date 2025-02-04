import { Locator, Page } from '@playwright/test';

export class TopbarPO {
  constructor(private readonly page: Page) {}

  public get applicationName(): Locator {
    return this.topbar.getByRole('link', { name: /start rocking!/i });
  }

  public get artistsLink(): Locator {
    return this.topbar.getByRole('link', { name: /artiesten/i });
  }

  public get playlistsLink(): Locator {
    return this.topbar.getByRole('link', { name: /playlists/i });
  }

  private get topbar(): Locator {
    return this.page.locator('sr-topbar');
  }
}
