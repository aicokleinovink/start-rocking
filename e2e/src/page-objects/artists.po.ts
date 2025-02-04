import { Locator, Page, Response } from '@playwright/test';

export class ArtistsPO {
  constructor(private readonly page: Page) {}

  public get pageTitle(): Locator {
    return this.page.getByRole('heading', { name: /artiesten/i });
  }

  public get searchArtistInput(): Locator {
    return this.artistsSection.getByRole('textbox', { name: /zoek artiest/i });
  }

  public get artistsLinks(): Locator {
    return this.artistsSection.getByRole('link');
  }

  private get artistsSection(): Locator {
    return this.page.locator('section').filter({ hasText: 'Vind je favoriete artiest "' });
  }

  public goto(): Promise<Response | null> {
    return this.page.goto('/artiesten');
  }

  public getArtistLink(name: RegExp | string): Locator {
    return this.artistsSection.getByRole('link', { name });
  }
}
