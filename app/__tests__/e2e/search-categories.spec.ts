import { test, expect } from '@playwright/test'

test('should navigate to the clothing products page', async ({ page }) => {
  await page.goto('/search')
  await page.getByRole('link', { name: 'Clothing' }).click()
  await expect(page).toHaveURL('/products/Clothing')
})

test('should navigate to the feeding products page', async ({ page }) => {
  await page.goto('/search')
  await page.getByRole('link', { name: 'Feeding' }).click()
  await expect(page).toHaveURL('/products/Feeding')
})

test('should navigate to the sleeping products page', async ({ page }) => {
  await page.goto('/search')
  await page.getByRole('link', { name: 'Sleeping' }).click()
  await expect(page).toHaveURL('/products/Sleeping')
})

test('should navigate to the travelling products page', async ({ page }) => {
  await page.goto('/search')
  await page.getByRole('link', { name: 'Travelling' }).click()
  await expect(page).toHaveURL('/products/Travelling')
})

test('should navigate to the cleaning products page', async ({ page }) => {
  await page.goto('/search')
  await page.getByRole('link', { name: 'Cleaning' }).click()
  await expect(page).toHaveURL('/products/Cleaning')
})

test('should navigate to the playing products page', async ({ page }) => {
  await page.goto('/search')
  await page.getByRole('link', { name: 'Playing' }).click()
  await expect(page).toHaveURL('/products/Playing')
})

test('should navigate to the monitoring products page', async ({ page }) => {
  await page.goto('/search')
  await page.getByRole('link', { name: 'Monitoring' }).click()
  await expect(page).toHaveURL('/products/Monitoring')
})

test('should navigate to the other products page', async ({ page }) => {
  await page.goto('/search')
  await page.getByRole('link', { name: 'Other' }).click()
  await expect(page).toHaveURL('/products/Other')
})
