import test, { chromium } from "playwright/test";

test('test', async ({
}) => {
    const browser = await chromium.launch({ args: ['--ignore-certificate-errors', '--unsafely-treat-insecure-origin-as-secure=http://example.com']}); // Ensure non-headless mode

    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    const page = await context.newPage();

    // Navigate to the page where clipboard access is required
    await page.goto('https://example.com');
    

    // Ensure user interaction before reading clipboard
    console.log("Clicking on the page to allow clipboard access...");
    await page.click('body'); // Simulate user interaction
    await page.evaluate(() => navigator.clipboard.writeText('123'));
    // Try reading clipboard using the standard API
    try {
        const clipboardText = await page.evaluate(async () => {
            return await navigator.clipboard.readText();
        });
        console.log("Clipboard content:", clipboardText);
    } catch (error) {
        console.error("Failed to read clipboard using navigator API:", error);
    }
});