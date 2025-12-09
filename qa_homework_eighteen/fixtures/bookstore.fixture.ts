import { test as base, expect } from '@playwright/test';
import { BookStorePage } from 'pages/bookstore-list-page';
import { BookDetailsPage } from 'pages/book-details-page';

interface BookstoreFixtures {
    bookStorePage: BookStorePage;
    bookDetailsPage: BookDetailsPage;
};

export const test = base.extend<BookstoreFixtures>({
    bookStorePage: async ({ page }, use): Promise<void> => {
        const bookStorePage = new BookStorePage(page);
        await use(bookStorePage);
    },

    bookDetailsPage: async ({ page }, use): Promise<void> => {
        const bookDetailsPage = new BookDetailsPage(page);
        await use(bookDetailsPage);
    }
});

export { expect };
