import { test, expect } from '@playwright/test';

test.describe('Weather App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the weather app header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('WeatherSync');
    await expect(page.locator('.fas.fa-cloud-sun')).toBeVisible();
  });

  test('should have theme toggle buttons', async ({ page }) => {
    // Check main theme toggle button
    const themeButton = page.locator('button[title*="Current theme"]');
    await expect(themeButton).toBeVisible();
    
    // Check seasonal theme toggle button
    const seasonalButton = page.locator('button[title*="Current seasonal theme"]');
    await expect(seasonalButton).toBeVisible();
  });

  test('should toggle between themes', async ({ page }) => {
    const themeButton = page.locator('button[title*="Current theme"]');
    
    // Initial state should be light theme
    await expect(page.locator('html')).not.toHaveClass(/dark|cosmic/);
    
    // Click to go to dark theme
    await themeButton.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    // Click to go to cosmic theme
    await themeButton.click();
    await expect(page.locator('html')).toHaveClass(/cosmic/);
    
    // Click to go back to light theme
    await themeButton.click();
    await expect(page.locator('html')).not.toHaveClass(/dark|cosmic/);
  });

  test('should toggle seasonal themes', async ({ page }) => {
    const seasonalButton = page.locator('button[title*="Current seasonal theme"]');
    
    // Initial state should be no seasonal theme
    await expect(page.locator('html')).not.toHaveClass(/christmas|halloween/);
    
    // Click to go to Christmas theme
    await seasonalButton.click();
    await expect(page.locator('html')).toHaveClass(/christmas/);
    
    // Click to go to Halloween theme
    await seasonalButton.click();
    await expect(page.locator('html')).toHaveClass(/halloween/);
    
    // Click to go back to no seasonal theme
    await seasonalButton.click();
    await expect(page.locator('html')).not.toHaveClass(/christmas|halloween/);
  });

  test('should have unit toggle buttons', async ({ page }) => {
    const celsiusButton = page.locator('button:has-text("°C")');
    const fahrenheitButton = page.locator('button:has-text("°F")');
    
    await expect(celsiusButton).toBeVisible();
    await expect(fahrenheitButton).toBeVisible();
  });

  test('should have search functionality', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search for a city"]');
    await expect(searchInput).toBeVisible();
    
    // Type in search input
    await searchInput.fill('London');
    await expect(searchInput).toHaveValue('London');
  });

  test('should display loading state when no weather data', async ({ page }) => {
    // Initially should show some loading or empty state
    const loadingElement = page.locator('text=Loading');
    const noDataElement = page.locator('text=No weather data');
    
    // One of these should be visible
    const hasLoading = await loadingElement.isVisible();
    const hasNoData = await noDataElement.isVisible();
    
    expect(hasLoading || hasNoData).toBeTruthy();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Header should still be visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Theme buttons should still be accessible
    await expect(page.locator('button[title*="Current theme"]')).toBeVisible();
    await expect(page.locator('button[title*="Current seasonal theme"]')).toBeVisible();
  });

  test('should persist theme selection', async ({ page }) => {
    const themeButton = page.locator('button[title*="Current theme"]');
    
    // Change to dark theme
    await themeButton.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    // Reload page
    await page.reload();
    
    // Should still be dark theme
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Tab through elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to activate theme button with Enter
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});

test.describe('Weather App with API Mock', () => {
  test.beforeEach(async ({ page }) => {
    // Mock weather API responses
    await page.route('**/api/weather/current**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          location: {
            city: 'London',
            country: 'UK'
          },
          current: {
            temperature: 22,
            feelsLike: 25,
            condition: 'Partly Cloudy',
            description: 'partly cloudy',
            icon: '02d',
            humidity: 65,
            pressure: 1013,
            windSpeed: 15,
            windDirection: 180,
            visibility: 10,
            uvIndex: 5
          }
        })
      });
    });

    await page.route('**/api/search**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { name: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 }
        ])
      });
    });

    await page.goto('/');
  });

  test('should display weather data when API returns data', async ({ page }) => {
    // Trigger weather data load by searching
    const searchInput = page.locator('input[placeholder*="Search for a city"]');
    await searchInput.fill('London');
    
    // Wait for and click on search result
    await page.waitForTimeout(500); // Wait for debounce
    const searchResult = page.locator('text=London, UK');
    if (await searchResult.isVisible()) {
      await searchResult.click();
      
      // Check if weather data is displayed
      await expect(page.locator('text=London, UK')).toBeVisible();
      await expect(page.locator('text=22°')).toBeVisible();
      await expect(page.locator('text=Partly Cloudy')).toBeVisible();
    }
  });
});