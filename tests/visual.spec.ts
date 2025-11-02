import fs from 'fs'
import path from 'path'

import { expect, test } from '@playwright/test'

// Test all pages with snapshot testing
const pages = [
  { path: '/', name: 'Home' },
  { path: '/open-source-projects', name: 'Open Source Projects' },
]

function getSnapshotPath(pageName: string, variant: 'light' | 'dark') {
  const projectName = test.info().project?.name ?? 'unknown-project'
  const isMobile = /mobile|ipad|iphone/i.test(projectName)
  const group = isMobile ? 'mobile' : 'desktop'
  const device = projectName.replace(/-desktop|-mobile/i, '')

  const snapshotRoot = path.resolve(process.cwd(), 'test-results', 'snapshots')
  const deviceDir = path.join(snapshotRoot, group, device)
  fs.mkdirSync(deviceDir, { recursive: true })

  return path.join(
    deviceDir,
    `${pageName.toLowerCase().replace(/\s+/g, '-')}-${variant}.png`
  )
}

for (const page of pages) {
  test.describe(`${page.name} Page`, () => {
    test('should match visual snapshot in light mode', async ({ page: pw }) => {
      await pw.goto(page.path)

      // Wait for page to be fully loaded
      await pw.waitForLoadState('networkidle')

      // Compute snapshot path: group by desktop/mobile then device name
      const projectName = test.info().project?.name ?? 'unknown-project'
      const isMobile = /mobile|ipad|iphone/i.test(projectName)
      const group = isMobile ? 'mobile' : 'desktop'
      const device = projectName.replace(/-desktop|-mobile/i, '')

      const snapshotRoot = path.resolve(
        process.cwd(),
        'test-results',
        'snapshots'
      )
      const deviceDir = path.join(snapshotRoot, group, device)
      fs.mkdirSync(deviceDir, { recursive: true })

      const snapshotPath = getSnapshotPath(page.name, 'light')

      // Take full page screenshot
      await expect(pw).toHaveScreenshot(snapshotPath, { fullPage: true })
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

      // Compute snapshot path: group by desktop/mobile then device name
      const projectName = test.info().project?.name ?? 'unknown-project'
      const isMobile = /mobile|ipad|iphone/i.test(projectName)
      const group = isMobile ? 'mobile' : 'desktop'
      const device = projectName.replace(/-desktop|-mobile/i, '')

      const snapshotRoot = path.resolve(
        process.cwd(),
        'test-results',
        'snapshots'
      )
      const deviceDir = path.join(snapshotRoot, group, device)
      fs.mkdirSync(deviceDir, { recursive: true })

      const snapshotPath = getSnapshotPath(page.name, 'dark')

      // Take full page screenshot
      await expect(pw).toHaveScreenshot(snapshotPath, { fullPage: true })
    })
  })
}
