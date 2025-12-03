import { Page, Locator, expect } from '@playwright/test';

export class BookDetailsPage {

    public constructor(private readonly page: Page) {}

    public get detailsHeading(): Locator {
        return this.page.locator('.mt-3');
    }

    public get bookTitle(): Locator {
        return this.page.getByRole('heading', { level: 3 });
    }

    public get priceInfo(): Locator {
        return this.page.locator('.col-xl-6.col-md-6.col-sm-6.pl-4 p').filter({ hasText: 'Price' });
    }

    public get addBookToCardButton(): Locator {
        return this.page.locator('.btn.btn-danger').filter({ hasText: 'Add to card' });
    }

    public get breadcrumbBookstore(): Locator {
        return this.page.locator('.breadcrumb-item.active').filter({ hasText: 'E-commerce Bookstore Practice Automation'});
    }

    public get itemInCart(): Locator {
        return this.page.locator('td.information');
    }

    public async gotoById(bookId: string): Promise<void> {
        await this.page.goto(`/bookstore/books/${bookId}`);
    }

    public async addViewedBookToCart(expectedTitle: string): Promise<void> {
        await expect(this.bookTitle).toContainText(expectedTitle);
        await this.addBookToCardButton.click();
    }

    public async getBookTitleFromH3(): Promise<string> {
        return this.bookTitle.innerText();
    }

    public async goBackToBookslist(): Promise<void> {
        await expect(this.breadcrumbBookstore).toBeVisible();
        await this.breadcrumbBookstore.click();
    }

    public async getFirstCartItemInfo(): Promise<string> {
        return this.itemInCart.nth(0).innerText();
    }

}
