import { test, expect } from '@playwright/test';

test('Servicenow Developer Profile and Testing Profile', async ({ browser }) => {

    test.setTimeout(180000); // CHANGED: 60000 -> 180000 (two full flows need more time)

    // ========== FIRST PROFILE: SERVICENOW DEVELOPER ==========

    const context1 = await browser.newContext();
    const page = await context1.newPage();

    try {
        await page.goto('https://www.naukri.com/', { waitUntil: 'domcontentloaded' }); // CHANGED

        await page.locator("//a[@id='login_Layer']").click();

        await page
            .locator("//input[@placeholder='Enter your active Email ID / Username']")
            .fill("aruninatikar9@gmail.com");

        await page
            .locator("//input[@placeholder='Enter your password']")
            .fill("Nauk@1234");

        await page.locator("//button[normalize-space()='Login']").click();

        const profileMenu = page.locator(
            "//button[@aria-label='Open profile menu']"
        );

        await expect(profileMenu).toBeVisible({ timeout: 20000 });

        console.log("ServiceNow profile login successful");

        await profileMenu.click();

        await page
            .locator("//a[normalize-space()='View & Update Profile']")
            .click();

        await page
            .locator("//em[@aria-label='Edit basic details']")
            .click();

        const saveButton = page.locator(
            "//button[@id='saveBasicDetailsBtn']"
        );

        await expect(saveButton).toBeVisible({ timeout: 10000 });
        await saveButton.click();

        console.log("ServiceNow Developer Profile flow completed");

    } catch (error) {
        if (!page.isClosed()) { // CHANGED: avoid screenshot on a closed page
            await page.screenshot({
                path: 'servicenow-profile-error.png',
                fullPage: true
            });
        }

        console.log("ServiceNow profile flow failed");
        throw error;

    } finally {
        await context1.close();
    }


    // ========== SECOND PROFILE: TESTING ==========

    const context2 = await browser.newContext();
    const page2 = await context2.newPage();

    try {
        await page2.goto('https://www.naukri.com/', { waitUntil: 'domcontentloaded' }); // CHANGED

        await page2.locator("//a[@id='login_Layer']").click();

        await page2
            .locator("//input[@placeholder='Enter your active Email ID / Username']")
            .fill("arunnatikar99@gmail.com");

        await page2
            .locator("//input[@placeholder='Enter your password']")
            .fill("Nauk@1234");

        await page2.locator("//button[normalize-space()='Login']").click();

        const profileMenu1 = page2.locator(
            "//button[@aria-label='Open profile menu']"
        );

        await expect(profileMenu1).toBeVisible({ timeout: 20000 });

        console.log("Testing profile login successful");

        await profileMenu1.click();

        await page2
            .locator("//a[normalize-space()='View & Update Profile']")
            .click();

        await page2
            .locator("//em[@aria-label='Edit basic details']")
            .click();

        const saveButton1 = page2.locator(
            "//button[@id='saveBasicDetailsBtn']"
        );

        await expect(saveButton1).toBeVisible({ timeout: 10000 });
        await saveButton1.click();

        console.log("Testing Profile flow completed");

    } catch (error) {
        if (!page2.isClosed()) { // CHANGED: avoid screenshot on a closed page
            await page2.screenshot({
                path: 'testing-profile-error.png',
                fullPage: true
            });
        }

        console.log("Testing profile flow failed");
        throw error;

    } finally {
        await context2.close();
    }

});
