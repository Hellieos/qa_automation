import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly _url: string = `${process.env.BASE_URL}/login`;

    public constructor(private readonly page: Page) {}

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

    public async goto(): Promise<void> {
        await this.page.goto('/login');
    }

    public async login(username: string, password:string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public getFlashMessageLocator(): Locator {
        return this.flashMessage;
    }
}

