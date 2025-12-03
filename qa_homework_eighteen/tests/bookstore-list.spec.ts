import { test, expect } from '../fixtures/bookstore.fixture';

test.describe('Bookstore List page', () => {
    test.beforeEach( async ({ page, bookStorePage }): Promise<void> => {
        await bookStorePage.gotoBookstore();
        await bookStorePage.acceptCookiesIfVisible();
        await expect(page).toHaveURL(`${process.env.BASE_URL}/bookstore`);
        await expect(bookStorePage.headingBooksList).toContainText('Books List');
    });

    // Тест-кейс 1: Застосувати фільтр New і перевірити сортування
    test('Застосувати фільтр New', async ({ bookStorePage }): Promise<void> => {
        await expect(bookStorePage.sortNewButton).toBeVisible();

        await bookStorePage.sortNew();
    });

    // Тест-кейс 2: Застосувати фільтр Descending і перевірити сортування
    test('Застосувати фільтр Descending', async ({ bookStorePage }): Promise<void> => {
        await expect(bookStorePage.priceDropdown).toBeVisible();

        await bookStorePage.priceDropdown.click();
        await expect(bookStorePage.sortByDescOption).toBeVisible();
        await bookStorePage.sortByDescOption.click();
        await expect(bookStorePage.productCard.nth(0)).toContainText('Agile Testing');
    });

    // Тест-кейс 3: Застосувати free text пошук і перевірити сортування
    test('Застосувати free text пошук', async ({ bookStorePage }): Promise<void> => {
        await expect(bookStorePage.searchInput).toBeVisible();

        await bookStorePage.searchInput.fill('JavaScript');
        await bookStorePage.searchButton.click();
        await expect(bookStorePage.productCard).toBeVisible();

        const title = await bookStorePage.getProductTitle(0);

        expect(title.toLowerCase()).toContain('javascript');
    });

    // Тест-кейс 4: Додати всі книги в корзину і перевірити badge
    test('Додати всі книги в корзину', async ({ bookStorePage }): Promise<void> => {
        const productCount = await bookStorePage.getProductCount();
        await bookStorePage.addAllBooksToCart();
        const badgeCount = await bookStorePage.getCartBadgeAmount();

        expect(badgeCount).toEqual(productCount);
    });
});
