from playwright.sync_api import sync_playwright

def verify(slug, name):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 375, "height": 812})
        try:
            page.goto(f'http://localhost:5173/demo/{slug}', wait_until='networkidle')

            # Switch to Preview tab
            preview_tab = page.get_by_text('Ver Tarjeta')
            if preview_tab.is_visible():
                preview_tab.click()

            page.wait_for_timeout(1000)
            modal_button = page.locator('button.btn-modal.primary')
            if modal_button.is_visible():
                modal_button.click()

            page.wait_for_timeout(2000)
            page.screenshot(path=f'verification/{name}_hero.png')

            # Scroll down to trigger animations
            page.evaluate("window.scrollTo(0, 500)")
            page.wait_for_timeout(1000)
            page.screenshot(path=f'verification/{name}_scrolled.png')
            print(f'Screenshots saved for {name}')

        except Exception as e:
            print(f"Error for {name}: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify('rapunzel', 'skeleton1')
