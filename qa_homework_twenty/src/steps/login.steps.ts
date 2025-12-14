import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import type { HomeworkWorld } from '../worlds/homework.world';

Given('я відкриваю сторінку логіну', async function (this: HomeworkWorld) {
    await this.loginPage.goto();
});


When('я вводжу коректний логін і пароль', async function (this: HomeworkWorld) {
    await this.loginPage.login(this.validUsername, this.validPassword);
});

When('я вводжу невалідний логін і валідний пароль', async function (this: HomeworkWorld) {
    await this.loginPage.login(this.invalidUsername, this.validPassword);
});

When('я не заповнюю поля логіну і пароля', async function (this: HomeworkWorld) {
    await this.loginPage.login('', '');
});

When('я натискаю кнопку "Login"', async function (this: HomeworkWorld) {
    // already clicked inside login()
});

When('я натискаю кнопку "Logout"', async function (this: HomeworkWorld) {
    await this.loginPage.logout();
});


Then('я бачу повідомлення "You logged into a secure area!"', async function (this: HomeworkWorld) {
    await this.loginPage.assertLoginSuccess();
});

Then('я бачу повідомлення "Your username is invalid!"', async function (this: HomeworkWorld) {
    await this.loginPage.assertInvalidUsername();
});

Then('я бачу повідомлення "You logged out of the secure area!"', async function (this: HomeworkWorld) {
    await this.loginPage.assertLoggedOut();
});

Then(/^URL містить "\/secure"$/, async function (this: HomeworkWorld) {
    await expect(this.page).toHaveURL(/\/secure/);
});

Then(/^URL містить "\/login"$/, async function (this: HomeworkWorld) {
    await expect(this.page).toHaveURL(/\/login/);
});

Given('я зайшла у систему з валідними обліковими даними', async function (this: HomeworkWorld) {
    await this.loginPage.goto();
    await this.loginPage.login(this.validUsername, this.validPassword);
    await this.loginPage.assertLoginSuccess();
});
