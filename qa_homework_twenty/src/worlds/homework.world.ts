import { setWorldConstructor, World } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from 'playwright';
import { LoginPage } from '../pages/login-page';

export class HomeworkWorld extends World {

    public browser!: Browser;
    public context!: BrowserContext;
    public page!: Page;

    public loginPage!: LoginPage;

    public readonly validUsername: string;
    public readonly validPassword: string;
    public readonly invalidUsername = 'wrong-user';

    public constructor(options: import('@cucumber/cucumber').IWorldOptions) {
        super(options);

        this.validUsername = process.env.LOGIN_USERNAME ?? '';
        this.validPassword = process.env.LOGIN_PASSWORD ?? '';

        if (!this.validUsername || !this.validPassword) {
            throw new Error('Missing env vars: LOGIN_USERNAME / LOGIN_PASSWORD');
        }
    }
}

setWorldConstructor(HomeworkWorld);
