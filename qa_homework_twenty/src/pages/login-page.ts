import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    private readonly successLoginMessage = 'You logged into a secure area!';
    private readonly invalidUsernameMessage = 'Your username is invalid!';
    private readonly loggedOutMessage = 'You logged out of the secure area!';

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
        const baseUrl = process.env.BASE_URL;
        await this.page.goto(`${baseUrl}/login`);
    }

    public async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    private async assertFlashContains(text: string): Promise<void> {
        await expect(this.flashMessage).toContainText(text);
    }

    public async assertLoginSuccess(): Promise<void> {
        await this.assertFlashContains(this.successLoginMessage);
        await expect(this.page).toHaveURL(/\/secure/);
    }

    public async assertInvalidUsername(): Promise<void> {
        await this.assertFlashContains(this.invalidUsernameMessage);
        await expect(this.page).toHaveURL(/\/login/);
    }

    public async logout(): Promise<void> {
        await this.logoutButton.click();
    }

    public async assertLoggedOut(): Promise<void> {
        await this.assertFlashContains(this.loggedOutMessage);
        await expect(this.page).toHaveURL(/\/login/);
    }
}
