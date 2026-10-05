/*
 * SPDX-FileCopyrightText: 2026 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect } from '@playwright/test';
import { regressionTest } from '@utils/test';

regressionTest('accessibility', async ({ mount, makeAxeBuilder }) => {
  await mount(`
    <ix-input label="Input" helper-text="Helper"></ix-input>
    <ix-number-input label="Number" helper-text="Helper"></ix-number-input>
    <ix-textarea label="Textarea" helper-text="Helper"></ix-textarea>
  `);

  const results = await makeAxeBuilder().analyze();
  expect(results.violations).toEqual([]);
});

regressionTest('renders', async ({ mount, page }) => {
  await mount(`<ix-input label="Input"></ix-input>`);
  const input = page.locator('ix-input');
  await expect(input).toHaveClass(/hydrated/);
  await expect(input).toBeVisible();
});

regressionTest('ix-input exposes CSS parts', async ({ mount, page }) => {
  await mount(
    `<ix-input label="Label" helper-text="Helper" required></ix-input>`
  );
  await expect(page.locator('ix-input')).toHaveClass(/hydrated/);
  await page.addStyleTag({
    content: `
      ix-input::part(input) { opacity: 0.11; }
      ix-input::part(required-indicator) { opacity: 0.12; }
      ix-input::part(helper-text) { opacity: 0.13; }
      ix-input::part(label) { color: rgb(1, 2, 3); }
    `,
  });

  await expect(page.locator('ix-input [part~="input"]').first()).toHaveCSS(
    'opacity',
    '0.11'
  );
  await expect(
    page.locator('ix-input [part~="required-indicator"]').first()
  ).toHaveCSS('opacity', '0.12');
  await expect(
    page.locator('ix-input [part~="helper-text"]').first()
  ).toHaveCSS('opacity', '0.13');
  await expect(page.locator('ix-input [part~="label"]').first()).toHaveCSS(
    'color',
    'rgb(1, 2, 3)'
  );
});

regressionTest('ix-number-input exposes CSS parts', async ({ mount, page }) => {
  await mount(
    `<ix-number-input label="Label" helper-text="Helper" required></ix-number-input>`
  );
  await expect(page.locator('ix-number-input')).toHaveClass(/hydrated/);
  await page.addStyleTag({
    content: `
      ix-number-input::part(input) { opacity: 0.11; }
      ix-number-input::part(required-indicator) { opacity: 0.12; }
      ix-number-input::part(helper-text) { opacity: 0.13; }
      ix-number-input::part(label) { color: rgb(1, 2, 3); }
    `,
  });

  await expect(
    page.locator('ix-number-input [part~="input"]').first()
  ).toHaveCSS('opacity', '0.11');
  await expect(
    page.locator('ix-number-input [part~="required-indicator"]').first()
  ).toHaveCSS('opacity', '0.12');
  await expect(
    page.locator('ix-number-input [part~="helper-text"]').first()
  ).toHaveCSS('opacity', '0.13');
  await expect(
    page.locator('ix-number-input [part~="label"]').first()
  ).toHaveCSS('color', 'rgb(1, 2, 3)');
});

regressionTest('ix-textarea exposes CSS parts', async ({ mount, page }) => {
  await mount(
    `<ix-textarea label="Label" helper-text="Helper" required></ix-textarea>`
  );
  await expect(page.locator('ix-textarea')).toHaveClass(/hydrated/);
  await page.addStyleTag({
    content: `
      ix-textarea::part(textarea) { opacity: 0.11; }
      ix-textarea::part(required-indicator) { opacity: 0.12; }
      ix-textarea::part(helper-text) { opacity: 0.13; }
      ix-textarea::part(label) { color: rgb(1, 2, 3); }
    `,
  });

  await expect(
    page.locator('ix-textarea [part~="textarea"]').first()
  ).toHaveCSS('opacity', '0.11');
  await expect(
    page.locator('ix-textarea [part~="required-indicator"]').first()
  ).toHaveCSS('opacity', '0.12');
  await expect(
    page.locator('ix-textarea [part~="helper-text"]').first()
  ).toHaveCSS('opacity', '0.13');
  await expect(page.locator('ix-textarea [part~="label"]').first()).toHaveCSS(
    'color',
    'rgb(1, 2, 3)'
  );
});

regressionTest('exposes the helper text icon part', async ({ mount, page }) => {
  await mount(
    `<ix-input label="Label" invalid-text="Error" class="ix-invalid"></ix-input>`
  );
  await expect(page.locator('ix-input')).toHaveClass(/hydrated/);
  await page.addStyleTag({
    content: `
      ix-input::part(helper-text-icon) { opacity: 0.11; }
    `,
  });

  await expect(
    page.locator('ix-input [part~="helper-text-icon"]').first()
  ).toHaveCSS('opacity', '0.11');
});
