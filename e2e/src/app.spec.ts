import { expect, test } from '@playwright/test';
import { TopbarPO } from './page-objects';

test.describe('App', () => {
  let topbarPO: TopbarPO;

  test.beforeEach(async ({ page }) => {
    topbarPO = new TopbarPO(page);
    await page.goto('/');
  });

  test('should display application header', async ({ page }) => {
    await expect(topbarPO.applicationName).toBeVisible();
    await expect(topbarPO.artistsLink).toBeVisible();
    await expect(topbarPO.playlistsLink).toBeVisible();
    await expect(topbarPO.artistsLink).toHaveClass('active');
    await expect(topbarPO.playlistsLink).not.toHaveClass('active');
    expect(page.url()).toContain('/artiesten');
  });
});
