import { test, expect } from '@playwright/test'

test('should navigate back to the index page', async ({ page }) => {
    await page.goto('/search')
    // Find an element with the text 'Back' and click on it
    await page.getByRole('link', { name: 'Back' }).click()
    // The new URL should be "/"
    await expect(page).toHaveURL('/')
  })

test('should navigate to the clothing products page', async ({ page }) => {
    await page.goto('/search')
    // Find an element with the text 'Clothing' and click on it
    await page.getByRole('link', { name: 'Clothing' }).click()
    // The new URL should be "/products/Clothing"
    await expect(page).toHaveURL('/products/Clothing')
})

test('should navigate to the feeding products page', async ({ page }) => {
    await page.goto('/search')
    // Find an element with the text 'Feeding' and click on it
    await page.getByRole('link', { name: 'Feeding' }).click()
    // The new URL should be "/products/Feeding"
    await expect(page).toHaveURL('/products/Feeding')
})

test('should navigate to the sleeping products page', async ({ page }) => {
    await page.goto('/search')
    // Find an element with the text 'Sleeping' and click on it
    await page.getByRole('link', { name: 'Sleeping' }).click()
    // The new URL should be "/products/Sleeping"
    await expect(page).toHaveURL('/products/Sleeping')
})

test('should navigate to the travelling products page', async ({ page }) => {
    await page.goto('/search')
    // Find an element with the text 'Travelling' and click on it
    await page.getByRole('link', { name: 'Travelling' }).click()
    // The new URL should be "/products/Travelling"
    await expect(page).toHaveURL('/products/Travelling')
})

test('should navigate to the cleaning products page', async ({ page }) => {
    await page.goto('/search')
    // Find an element with the text 'Cleaning' and click on it
    await page.getByRole('link', { name: 'Cleaning' }).click()
    // The new URL should be "/products/Cleaning"
    await expect(page).toHaveURL('/products/Cleaning')
})

test('should navigate to the playing products page', async ({ page }) => {
    await page.goto('/search')
    // Find an element with the text 'Playing' and click on it
    await page.getByRole('link', { name: 'Playing' }).click()
    // The new URL should be "/products/Playing"
    await expect(page).toHaveURL('/products/Playing')
})

test('should navigate to the monitoring products page', async ({ page }) => {
    await page.goto('/search')
    // Find an element with the text 'Monitoring' and click on it
    await page.getByRole('link', { name: 'Monitoring' }).click()
    // The new URL should be "/products/Monitoring"
    await expect(page).toHaveURL('/products/Monitoring')
})

test('should navigate to the other products page', async ({ page }) => {
    await page.goto('/search')
    // Find an element with the text 'Other' and click on it
    await page.getByRole('link', { name: 'Other' }).click()
    // The new URL should be "/products/Other"
    await expect(page).toHaveURL('/products/Other')
})