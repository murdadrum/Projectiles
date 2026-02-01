import { test, expect } from '@playwright/test';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');

test('home renders and grid is complete', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'josh/barteaux' })).toBeVisible();
  await expect(page.getByTestId('tile-grid')).toBeVisible();

  const tiles = page.locator('[data-testid^="tile-"]');
  await expect(tiles).toHaveCount(16);
});

test('tile modal opens and closes', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('tile-0').click();
  await expect(page.getByTestId('tile-modal')).toBeVisible();
  await expect(page.getByText('VennDiachrome')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByTestId('tile-modal')).toBeHidden();
});

test('modal navigation advances tiles', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('tile-0').click();
  await expect(page.getByText('VennDiachrome')).toBeVisible();

  await page.getByLabel('Next tile').click();
  await expect(page.getByText('NeuralCanvas')).toBeVisible();
});

test('footer links are present', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/murdadrum');
  await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/joshbarteaux');
});

test('a11y baseline scan', async ({ page }) => {
  await page.goto('/');
  await page.addScriptTag({ path: axePath });

  const results = await page.evaluate(async () => {
    // @ts-expect-error - axe injected at runtime
    return await window.axe.run();
  });

  test.info().attach('axe-results.json', {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  });

  // Baseline-only: capture violations without failing the run.
  expect(results.violations).toBeDefined();
});
