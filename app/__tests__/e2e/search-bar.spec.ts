import { test, expect } from '@playwright/test'

test('Searching "jean" should filter to a list containing a pair of jeans', async ({ page }) => {
    await page.goto('http://localhost:3000/search')
    await page.getByPlaceholder('Search all products').click()
    await page.getByPlaceholder('Search all products').fill('jean')
    await expect(
        page.getByText('Pull-on Jeans'),
      ).toBeVisible()
  });
