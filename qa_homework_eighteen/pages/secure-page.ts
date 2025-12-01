import { Page, Locator } from '@playwright/test';

export class SecurePage {
    public constructor(private readonly page: Page) {}

    private get secureTitle(): Locator {
        return this.page.locator('h2');
    }

    private get welcomeText(): Locator {
        return this.page.locator('h4');
    }

    private get flashMessage(): Locator {
        return this.page.locator('#flash-message');
    }

    private get logoutLink(): Locator {
        return this.page.locator('a[href="/logout"]');
    }

    public async goto(): Promise<void> {
        await this.page.goto('/secure');
    }

    public async logout(): Promise<void> {
        await this.logoutLink.click();
    }

    public getLogoutLinkLocator(): Locator {
        return this.logoutLink;
    }

    public getFlashMessageLocator(): Locator {
        return this.flashMessage;
    }

    public getSecureTitleLocator(): Locator {
        return this.secureTitle;
    }

    public getWelcomeTextLocator(): Locator {
        return this.welcomeText;
    }
}
