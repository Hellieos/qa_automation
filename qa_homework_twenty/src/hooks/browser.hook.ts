import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import type { Browser } from 'playwright';

let browser: Browser;

export function browserHook(): void {
    BeforeAll(async function () {
        browser = await chromium.launch({ headless: true });
    });

    AfterAll(async function () {
        await browser.close();
    });
}

export function getBrowser(): Browser {
    return browser;
}
