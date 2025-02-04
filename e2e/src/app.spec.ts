import { expect, test } from '@playwright/test';
import { TopbarPO } from './page-objects';

test.describe('App', () => {
  let headerPO: TopbarPO;

  test.beforeEach(async ({ page }) => {
    headerPO = new TopbarPO(page);
    await page.goto('/');
  });

  test('should display application header', async ({ page }) => {
    await expect(headerPO.applicationName).toBeVisible();
    await expect(headerPO.artistsLink).toBeVisible();
    await expect(headerPO.playlistsLink).toBeVisible();
    await expect(headerPO.artistsLink).toHaveClass('active');
    await expect(headerPO.playlistsLink).not.toHaveClass('active');
    expect(page.url()).toContain('/artiesten');
  });
});
