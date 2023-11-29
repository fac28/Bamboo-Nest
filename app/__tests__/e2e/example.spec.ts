import { test, expect } from '@playwright/test'

test('should navigate to the login page', async ({ page }) => {
  await page.goto('/')
  // Find an element with the text 'Login' and click on it
  await page.getByRole('link', { name: 'Login' }).click();
  // The new URL should be "/login"
  await expect(page).toHaveURL('/login')
})

test('should navigate to the search page', async ({ page }) => {
  await page.goto('/')
  // Find a link with the text 'Buy' and click on it
  await page.getByRole('link', { name: 'Buy' }).click();
  // The new URL should be "/search"
  await expect(page).toHaveURL('/search')
})

test('should navigate to the upload page', async ({ page }) => {
  await page.goto('/')
  // Find a link with the text 'Sell' and click on it
  await page.getByRole('link', { name: 'Sell' }).click();
  // The new URL should be "/upload"
  await expect(page).toHaveURL('/upload')
})