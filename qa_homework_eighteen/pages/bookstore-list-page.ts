import { Page, Locator, expect } from '@playwright/test';

export class BookStorePage {

    public constructor(private readonly page: Page) {}

    public get searchInput(): Locator {
        return this.page.locator('#search-input');
    }

    public get signInButton(): Locator {
        return this.page.locator('[data-testid="goto-signin"]');
    }

    public get sortNewButton(): Locator {
        return this.page.getByRole('link', { name: 'New' });
    }

    public get searchButton(): Locator {
        return this.page.locator('#search-btn');
    }

    public get priceDropdown(): Locator {
        return this.page.locator('.filter_sort-select').getByText('Price', { exact: true });
        // return this.page.getByText('Price', { exact: true });
    }

    public get sortByDescOption(): Locator {
        return this.page.getByRole('link', { name: 'Sort By DESC' });
    }

    public get headingBooksList(): Locator {
        return this.page.getByRole('heading', {
            name: 'Books List',
            level: 1
        });
    }

    public get productCard(): Locator {
        return this.page.locator('#books .card-product-user');
    }

    public get bookTitles(): Locator {
        return this.page.locator('#books .card-product-user h5.card-title');
    }

    public get addToCartButton(): Locator {
        return this.page.locator('.btn.btn-expand', { hasText: 'Add To Cart' });
    }

    public get cartCounterBadge(): Locator {
        return this.page.locator('a[href="/bookstore/cart"] span.badge.bg-danger');
    }

    public get cartIconButton(): Locator {
        return this.page.locator('a[href="/bookstore/cart"]');
    }

    public get cookieConsentButton(): Locator {
        return this.page.getByRole('button', { name: 'Consent' });
    }

    public async gotoBookstore(): Promise<void> {
        await this.page.goto('/bookstore');
    }

    public async gotoCartFromBookslist(): Promise<void> {
        await expect(this.cartIconButton).toBeVisible();
        await this.cartIconButton.click();
    }

    public async sortNew(): Promise<void> {
        await this.sortNewButton.click();
        await expect(this.productCard.nth(0)).toContainText('The DevOps Handbook');
    }

    public async addAllBooksToCart(): Promise<void> {
        const count = await this.addToCartButton.count();

        for (let i = 0; i < count; i++) {
            await this.addToCartButton.nth(i).click();
        }
    }

    public async getProductCount(): Promise<number> {
        return this.productCard.count();
    }

    public async getProductTitle(index: number): Promise<string> {
        return this.bookTitles.nth(index).innerText();
    }

    public async getCartBadgeAmount(): Promise<number> {
        const text = (await this.cartCounterBadge.innerText()).trim();
        return Number(text);
    }

    public async acceptCookiesIfVisible(): Promise<void> {
        if (await this.cookieConsentButton.isVisible()) {
            await this.cookieConsentButton.click();
        }
    }
}
