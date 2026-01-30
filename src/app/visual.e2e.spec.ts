import { test, expect } from '@playwright/test';

const disableAnimations = `
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
`;

test.describe('visual regression', () => {
  test('homepage visual snapshot', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.addStyleTag({ content: disableAnimations });
    await expect(page.getByRole('heading', { name: /josh\/barteaux/i })).toBeVisible();
    await expect(page.getByRole('img', { name: /tile 1 back/i })).toBeVisible();
    await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });
  });

  test('tile modal visual snapshot', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.addStyleTag({ content: disableAnimations });
    await expect(page.getByRole('img', { name: /tile 2 back/i })).toBeVisible();
    await page.getByRole('button', { name: /tile 2 back/i }).first().click({ force: true });
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveScreenshot('tile-modal.png');
  });
});
