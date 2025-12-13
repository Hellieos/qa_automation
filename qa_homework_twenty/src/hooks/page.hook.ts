import { Before, After } from '@cucumber/cucumber';
import type { HomeworkWorld } from '../worlds/homework.world';
import { LoginPage } from '../pages/login-page';

export function pageHook(): void {
    Before(async function (this: HomeworkWorld) {
        this.page = await this.context.newPage();
        this.loginPage = new LoginPage(this.page);
    });

    After(async function (this: HomeworkWorld) {
        await this.page.close();
    });
}
