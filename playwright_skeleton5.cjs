const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 }); // iPhone X size

  try {
    await page.goto('http://localhost:5173/demo?theme=interactive', { waitUntil: 'networkidle' });

    // Wait for the start modal if it exists and click "Sí"
    const modalButton = page.locator('button.btn-modal.primary');
    if (await modalButton.isVisible()) {
      await modalButton.click();
    }

    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'verification/skeleton5_updated.png', fullPage: true });
    console.log('Screenshot saved to verification/skeleton5_updated.png');
  } catch (e) {
    console.error('Error during screenshot:', e);
  } finally {
    await browser.close();
  }
})();
