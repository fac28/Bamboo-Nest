import { test, expect } from '@playwright/test'

// test logo button
test('should navigate to the home page', async ({ page }) => {
  await page.goto('http://localhost:3000/search');
  await page.getByRole('link', { name: 'Bamboo Nest' }).click();
  await expect(page).toHaveURL('/')
});

//test login button
test('should navigate to the login page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Login' }).click()
  await expect(page).toHaveURL('/login')
})

// tests for burger menu
test('should navigate to the search page (burger menu)', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Open menu').click()
  await page.getByRole('link', { name: 'Search Items' }).click()
  await expect(page).toHaveURL('/search')
})

test('should navigate to the upload page (burger menu)', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Open menu').click()
  await page.getByRole('link', { name: 'Sell Item' }).click()
  await expect(page).toHaveURL('/upload')
})

test('should navigate to the account page (burger menu)', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Open menu').click()
  await page.getByRole('link', { name: 'Account' }).click()
  await expect(page).toHaveURL('/account')
})

test('should navigate to the contact page (burger menu)', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Open menu').click()
  await page.getByRole('link', { name: 'Contact' }).click()
  await expect(page).toHaveURL('/contact')
})

test('should navigate to the FAQ page (burger menu)', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Open menu').click()
  await page.getByRole('link', { name: 'FAQs' }).click()
  await expect(page).toHaveURL('/faq')
})
