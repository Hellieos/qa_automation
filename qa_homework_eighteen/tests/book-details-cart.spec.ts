import { test, expect } from '../fixtures/bookstore.fixture';

test.describe('Book Details and Viewing a Book in the Cart', () => {
    test.beforeEach( async ({ page, bookStorePage }): Promise<void> => {
        await bookStorePage.gotoBookstore();
        await bookStorePage.acceptCookiesIfVisible();
        await expect(page).toHaveURL(`${process.env.BASE_URL}/bookstore`);
        await expect(bookStorePage.headingBooksList).toContainText('Books List');
    });

    // Тест-кейс 1: Переглянути деталі книги і додати до корзини
    test('Переглянути деталі книги і додати до корзини', async ({ bookStorePage, bookDetailsPage }): Promise<void> => {
        await bookStorePage.getProductTitle(0);
        const expectedTitle =  await bookStorePage.getProductTitle(0);

        await bookStorePage.bookTitles.nth(0).click(); // тут тільки назва клікабельна, щоб відкорити книгу
        await bookDetailsPage.addViewedBookToCart(expectedTitle);
    });

    // Тест-кейс 2: Додати до корзини і перевірити чи правильна додана книга
    test('Перевірити додану до корзини книгу', async ({ bookStorePage, bookDetailsPage }): Promise<void> => {
        await bookStorePage.bookTitles.nth(0).click();
        await bookDetailsPage.getBookTitleFromH3();
        const expectedBookTitle = await bookDetailsPage.getBookTitleFromH3();
        await bookDetailsPage.addBookToCardButton.click();
        await bookStorePage.cartIconButton.click();

        const addedBookTitle = await bookDetailsPage.getFirstCartItemInfo();
        await expect(expectedBookTitle).toEqual(addedBookTitle);

    });

});
