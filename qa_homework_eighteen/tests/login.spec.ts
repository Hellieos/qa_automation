import { test, expect } from '../fixtures/practice.fixture';

const VALID_USERNAME = process.env.LOGIN_USERNAME as string;
const VALID_PASSWORD = process.env.LOGIN_PASSWORD as string;

test.describe('Login page', () => {
    test.beforeEach( async ({ loginPage }): Promise<void> => {
        await loginPage.goto();
    });

    test('успішний логін з валідними даними', async ({ page, loginPage, securePage }): Promise<void> => {
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);

        await expect(page).toHaveURL(`${process.env.BASE_URL}/secure`);
        await expect(securePage.getFlashMessageLocator()).toContainText(
            'You logged into a secure area!'
        );
    });

    test('логін з порожніми полями', async ({ page, loginPage }): Promise<void> => {
        await loginPage.login('', '');

        await expect(page).toHaveURL(`${process.env.BASE_URL}/login`);
        await expect(loginPage.getFlashMessageLocator()).toContainText(
            'Your username is invalid!'
        );
    });
});

test.describe('Secure area', () => {
    test.beforeEach(async ({ page, loginPage }): Promise<void> => {
        await loginPage.goto();
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
        await expect(page).toHaveURL(`${process.env.BASE_URL}/secure`);
    });

    test('перевірка контенту захищеної сторінки після логіну: logout наявний', async ({ securePage }): Promise<void> => {
        await expect(securePage.getFlashMessageLocator()).toBeVisible();
        await expect(securePage.getLogoutLinkLocator()).toBeVisible();
        await expect(securePage.getFlashMessageLocator()).toContainText(
            'You logged into a secure area!'
        );
    });

    test('логаут із захищеної сторінки', async ({ page, securePage, loginPage }): Promise<void> => {
        await securePage.logout();

        await expect(page).toHaveURL(`${process.env.BASE_URL}/login`);
        await expect(loginPage.getFlashMessageLocator()).toContainText(
            'You logged out of the secure area!'
        );
    });
});
