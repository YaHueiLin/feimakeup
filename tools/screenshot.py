import asyncio
from pyppeteer import launch
import shutil
import os

URL = 'http://127.0.0.1:8080/'
OUTPUT_DIR = 'assets/screenshots'

VIEWPORTS = {
    'mobile': (375, 667),
    'tablet': (768, 1024),
    'desktop': (1366, 768),
}

async def run():
    # Try to use system Chrome if available to avoid downloading Chromium
    chrome_paths = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        r"C:\Users\%s\AppData\Local\Google\Chrome\Application\chrome.exe" % (os.getlogin(),),
    ]

    executablePath = None
    for p in chrome_paths:
        if os.path.exists(p):
            executablePath = p
            break

    launch_kwargs = {'headless': True, 'args': ['--no-sandbox']}
    if executablePath:
        launch_kwargs['executablePath'] = executablePath

    browser = await launch(**launch_kwargs)
    page = await browser.newPage()

    for name, (w, h) in VIEWPORTS.items():
        await page.setViewport({'width': w, 'height': h})
        await page.goto(URL, {'waitUntil': 'networkidle2'})
        await asyncio.sleep(0.5)
        path = f"{OUTPUT_DIR}/{name}.png"
        await page.screenshot({'path': path, 'fullPage': True})
        print('Saved', path)

    await browser.close()

if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(run())
