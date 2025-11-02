import { expect, test } from '@playwright/test'

// Test all pages with snapshot testing
const pages = [
  { path: '/', name: 'Home' },
  { path: '/open-source-projects', name: 'Open Source Projects' },
]

for (const page of pages) {
  test.describe(`${page.name} Page`, () => {
    test('should match visual snapshot in light mode', async ({ page: pw }) => {
      await pw.goto(page.path)

      // Wait for page to be fully loaded
      await pw.waitForLoadState('networkidle')

      // Take full page screenshot
      await expect(pw).toHaveScreenshot(
        `${page.name.toLowerCase().replace(/\s+/g, '-')}-light.png`,
        {
          fullPage: true,
        }
      )
    })

    test('should match visual snapshot in dark mode', async ({ page: pw }) => {
      await pw.goto(page.path)

      // Wait for page to be fully loaded
      await pw.waitForLoadState('networkidle')

      // If a hamburger menu is present (mobile) open it so the theme toggle
      // is available in the Drawer. We check existence rather than viewport
      // size because some device configs may not expose viewportSize().
      const menuButton = pw.locator('[aria-label="Open navigation menu"]')
      const menuOpened = (await menuButton.count()) > 0
      if (menuOpened) {
        await menuButton.click()
        // Wait for drawer animation
        await pw.waitForTimeout(250)
      }

      // Toggle to dark mode by clicking the dark mode button (in top bar or Drawer)
      const darkModeButton = pw.locator(
        '[title*="dark mode" i], [title*="light mode" i]'
      )
      await darkModeButton.click()

      // If we opened the menu, wait for the Drawer to close so the page
      // snapshot won't capture the open Drawer overlay.
      if (menuOpened) {
        const drawer = pw.locator('[role="presentation"]')
        await drawer.waitFor({ state: 'detached', timeout: 2000 }).catch(() =>
          // fallback small wait if waiter times out
          pw.waitForTimeout(300)
        )
      }

      // Wait a bit for the theme transition
      await pw.waitForTimeout(500)

      // Take full page screenshot
      await expect(pw).toHaveScreenshot(
        `${page.name.toLowerCase().replace(/\s+/g, '-')}-dark.png`,
        {
          fullPage: true,
        }
      )
    })
  })
}
