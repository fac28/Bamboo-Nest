import { test, expect } from '@playwright/test'

test('should navigate to the index page', async ({ page }) => {
    await page.goto('/login')
    // Find an element with the text 'Back' and click on it
    await page.getByRole('link', { name: 'Back' }).click()
    // The new URL should be "/"
    await expect(page).toHaveURL('/')
  })

  test('should navigate to the signup page', async ({ page }) => {
    await page.goto('/login')
    // Find an element with the text 'Create an account' and click on it
    await page.getByRole('link', { name: 'Create an account' }).click()
    // The new URL should be "/"
    await expect(page).toHaveURL('/signup')
  })
