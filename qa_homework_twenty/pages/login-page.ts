import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    private get usernameInput(): Locator {
        return this.page.locator('#username');
    }

    private get passwordInput(): Locator {
        return this.page.locator('#password');
    }

    private get loginButton(): Locator {
        return this.page.locator('#login button[type="submit"]');
    }

    private get flashMessage(): Locator {
        return this.page.locator('#flash-message');
    }

    private get logoutButton(): Locator {
        return this.page.locator('a[href="/logout"]');
    }

    public async goto(): Promise<void> {
        await this.page.goto('https://practice.expandtesting.com/login');
    }

    public async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public async assertFlashContains(text: string): Promise<void> {
        await expect(this.flashMessage).toContainText(text);
    }

    public async logout(): Promise<void> {
        await this.logoutButton.click();
    }
}
