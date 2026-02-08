from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.set_viewport_size({"width": 375, "height": 812})
        try:
            page.goto('http://localhost:5173/demo/interactive', wait_until='networkidle')

            # Switch to Preview tab in mobile
            preview_tab = page.get_by_text('Ver Tarjeta')
            if preview_tab.is_visible():
                preview_tab.click()
                print('Switched to Preview tab')

            page.wait_for_timeout(1000)

            # Click modal button if present
            modal_button = page.locator('button.btn-modal.primary')
            if modal_button.is_visible():
                modal_button.click()
                print('Modal dismissed')

            page.wait_for_timeout(2000)

            # Screenshot of the 8 cards
            page.screenshot(path='verification/skeleton5_updated.png', full_page=True)
            print('Screenshot saved to verification/skeleton5_updated.png')

            # Try to click "ÁLBUM" card to show gallery
            # We need to find the card specifically.
            album_card = page.locator('.s5-card').filter(has_text='ÁLBUM')
            if album_card.is_visible():
                album_card.click()
                print('Clicked ÁLBUM card')
                page.wait_for_timeout(1000)
                page.screenshot(path='verification/skeleton5_album.png', full_page=True)
                print('Screenshot saved to verification/skeleton5_album.png')

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify()
