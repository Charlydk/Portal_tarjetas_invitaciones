import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        await page.goto('http://localhost:5173')
        await page.wait_for_timeout(5000)
        await page.screenshot(path='verification/debug_main.png')
        content = await page.content()
        print(f"Content length: {len(content)}")
        print(f"Select elements: {await page.evaluate('document.querySelectorAll(\"select\").length')}")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
