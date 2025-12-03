import { test as base, expect } from '@playwright/test';
import { LoginPage } from 'pages/login-page';
import { SecurePage } from 'pages/secure-page';

interface PracticeFixtures {
    loginPage: LoginPage;
    securePage: SecurePage;
};

export const test = base.extend<PracticeFixtures>({
    loginPage: async ({ page }, use): Promise<void> => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    securePage: async ({ page }, use): Promise<void> => {
        const securePage = new SecurePage(page);
        await use(securePage);
    }
});

export { expect };
