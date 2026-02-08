import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        await page.goto('http://localhost:5173')

        # Wait for app to load
        await page.wait_for_selector('text=InvitaWeb')

        # Test Skeleton 4
        print("Testing Skeleton 4...")
        await page.select_option('select', '4')
        await page.wait_for_timeout(2000)
        # Skeleton 4 has a welcome modal now because of TemplateWrapper?
        # Let's check if "¡BIENVENIDOS!" button is there
        if await page.query_selector('text=¡BIENVENIDOS!'):
            await page.click('text=¡BIENVENIDOS!')
            await page.wait_for_timeout(1000)

        await page.screenshot(path='verification/skeleton4_hero.png')

        # Scroll in Skeleton 4
        # Skeleton 4 container is .s4-scroll-container
        await page.evaluate("document.querySelector('.s4-scroll-container').scrollTop = 400")
        await page.wait_for_timeout(1000)
        await page.screenshot(path='verification/skeleton4_middle.png')

        # Test Skeleton 5
        print("Testing Skeleton 5...")
        await page.select_option('select', '5')
        await page.wait_for_timeout(2000)
        if await page.query_selector('text=¡BIENVENIDOS!'):
            await page.click('text=¡BIENVENIDOS!')
            await page.wait_for_timeout(1000)
        await page.screenshot(path='verification/skeleton5_hero.png')

        # Click a card to see flip
        await page.click('text=¿CUÁNDO?')
        await page.wait_for_timeout(1000)
        await page.screenshot(path='verification/skeleton5_card_flipped.png')

        # Test Skeleton 6
        print("Testing Skeleton 6...")
        await page.select_option('select', '6')
        await page.wait_for_timeout(2000)
        if await page.query_selector('text=¡BIENVENIDOS!'):
            await page.click('text=¡BIENVENIDOS!')
            await page.wait_for_timeout(1000)
        await page.screenshot(path='verification/skeleton6_hero.png')

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
