import { expect, test } from '@playwright/test';
import { ArtistsPO } from './page-objects';

test.describe('Artists', () => {
  let artistsPO: ArtistsPO;

  test.beforeEach(async ({ page }) => {
    artistsPO = new ArtistsPO(page);
    await artistsPO.goto();
  });

  test('should display artists', async () => {
    await expect(artistsPO.pageTitle).toBeVisible();
    await expect(artistsPO.getArtistLink('"Weird Al" Yankovic')).toBeVisible();
    await expect(artistsPO.getArtistLink('.38 Special')).toBeVisible();
    await expect(artistsPO.getArtistLink('3 Doors Down')).toBeVisible();
    await expect(artistsPO.artistsLinks).toHaveCount(888);
  });

  test('should be able to filter artists', async () => {
    await artistsPO.searchArtistInput.fill('weird');
    await expect(artistsPO.getArtistLink('"Weird Al" Yankovic')).toBeVisible();
    await expect(artistsPO.artistsLinks).toHaveCount(1);
  });

  test('should be able to view artist details', async ({ page }) => {
    await artistsPO.getArtistLink('"Weird Al" Yankovic').click();
    expect(page.url()).toContain('/artiesten');
  });
});
