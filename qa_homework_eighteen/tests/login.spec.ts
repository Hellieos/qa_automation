import { test, expect } from '@playwright/test';
import { LoginPage  } from 'pages/login-page';
import { SecurePage } from 'pages/secure-page';

const VALID_USERNAME = process.env.LOGIN_USERNAME as string;
const VALID_PASSWORD = process.env.LOGIN_PASSWORD as string;

test.describe('Login / Secure area', () => {
    // Тест-кейс 1: Успішний логін з валідними даними
    test('успішний логін з валідними даними', async ({ page }): Promise<void> => {
        const loginPage = new LoginPage(page);
        const securePage = new SecurePage(page);

        await loginPage.goto();
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

        await expect(page).toHaveURL(`${process.env.BASE_URL}/secure`);
        await expect(securePage.getFlashMessageLocator()).toContainText(
            'You logged into a secure area!'
        );
    });

    // Тест-кейс 2: Логін з порожніми полями
    test('логін з порожніми полями', async ({ page }): Promise<void> => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await loginPage.login('', '');

        await expect(page).toHaveURL(`${process.env.BASE_URL}/login`);
        await expect(loginPage.getFlashMessageLocator()).toContainText(
            'Your username is invalid!'
        );
    });

    //Тест-кейс 3: Перевірка контенту захищеної сторінки після логіну
    test('перевірка контенту захищеної сторінки після логіну: logout наявний', async ({ page }): Promise<void> => {
        const loginPage = new LoginPage(page);
        const securePage = new SecurePage(page);

        await loginPage.goto();
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

        await expect(page).toHaveURL(`${process.env.BASE_URL}/secure`);

        await expect(securePage.getFlashMessageLocator()).toBeVisible();
        await expect(securePage.getLogoutLinkLocator()).toBeVisible();
        await expect(securePage.getFlashMessageLocator()).toContainText(
            'You logged into a secure area!'
        );
    });

    //Тест-кейс 4: Логаут із захищеної сторінки
    test('логаут із захищеної сторінки', async ({ page }): Promise<void> => {
        const loginPage = new LoginPage(page);
        const securePage = new SecurePage(page);

        await loginPage.goto();
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

        await expect(page).toHaveURL(`${process.env.BASE_URL}/secure`);

        await securePage.logout();

        await expect(page).toHaveURL(`${process.env.BASE_URL}/login`);
        await expect(loginPage.getFlashMessageLocator()).toContainText(
            'You logged out of the secure area!'
        );
    });
});
