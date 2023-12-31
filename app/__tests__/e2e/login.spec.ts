import { test, expect } from '@playwright/test'

test('should navigate to the signup page', async ({ page }) => {
  await page.goto('/login')
  // Find an element with the text 'Create an account' and click on it
  await page.getByRole('link', { name: 'Create an account' }).click()
  // The new URL should be "/"
  await expect(page).toHaveURL('/signup')
})

test("should be able to log in (James's email, password is password)", async ({
  page,
}) => {
  await page.goto('/login')
  await page.getByPlaceholder('you@example.com').click()
  await page
    .getByPlaceholder('you@example.com')
    .fill('jsandfordsmith@blueyonder.co.uk')
  await page.getByPlaceholder('••••••••').click()
  await page.getByPlaceholder('••••••••').fill('password')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByText('Hey, James!')).toBeVisible()
})
