import { test, expect } from '@playwright/test'

test('should navigate to the search page (burger menu)', async ({ page }) => {
    await page.goto('/')
    // Open the menu and click the Search Items button
    await page.getByLabel('Open menu').click()
    await page.getByRole('link', { name: 'Search Items' }).click()
    // The new URL should be "/search"
    await expect(page).toHaveURL('/search')
  })
  
  test('should navigate to the upload page (burger menu)', async ({ page }) => {
    await page.goto('/')
    // Open the menu and click the Sell Item button
    await page.getByLabel('Open menu').click()
    await page.getByRole('link', { name: 'Sell Item' }).click()
    // The new URL should be "/upload"
    await expect(page).toHaveURL('/upload')
  })
  
  test('should navigate to the account page (burger menu)', async ({ page }) => {
    await page.goto('/')
    // Open the menu and click the Account button
    await page.getByLabel('Open menu').click()
    await page.getByRole('link', { name: 'Account' }).click()
    // The new URL should be "/account"
    await expect(page).toHaveURL('/account')
  })
  
  test('should navigate to the contact page (burger menu)', async ({ page }) => {
    await page.goto('/')
    // Open the menu and click the Contact button
    await page.getByLabel('Open menu').click()
    await page.getByRole('link', { name: 'Contact' }).click()
    // The new URL should be "/account"
    await expect(page).toHaveURL('/contact')
  })
  
  test('should navigate to the FAQ page (burger menu)', async ({ page }) => {
    await page.goto('/')
    // Open the menu and click the FAQs button
    await page.getByLabel('Open menu').click()
    await page.getByRole('link', { name: 'FAQs' }).click()
    // The new URL should be "/faq"
    await expect(page).toHaveURL('/faq')
  })