import 'dotenv/config';

import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;

const VALID_USERNAME = process.env.LOGIN_USERNAME as string;
const VALID_PASSWORD = process.env.LOGIN_PASSWORD as string;
const INVALID_USERNAME = 'wrong-user';

Before(async () => {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
});

After(async () => {
    await browser.close();
});

Given('я відкриваю сторінку логіну', async function () {
    await loginPage.goto();
});

When('я вводжу коректний логін і пароль', async function () {
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
});

When('я вводжу невалідний логін і валідний пароль', async function () {
    await loginPage.login(INVALID_USERNAME, VALID_PASSWORD);
});

When('я не заповнюю поля логіну і пароля', async function () {
    await loginPage.login('', '');
});

When('я натискаю кнопку "Login"', async function () {
    // у нас клік уже відбувся всередині login(),
    // але step лишаю, щоб фрази у feature логічно читались
});

Then('я бачу повідомлення {string}', async function (message: string) {
    await loginPage.assertFlashContains(message);
});

Then('URL містить {string}', async function (pathPart: string) {
    await expect(page).toHaveURL(new RegExp(pathPart));
});

Given('я зайшла у систему з валідними обліковими даними', async function () {
    await loginPage.goto();
    await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
    await expect(page).toHaveURL(/\/secure/);
});

When('я натискаю кнопку "Logout"', async function () {
    await loginPage.logout();
});
