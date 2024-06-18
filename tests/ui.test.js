import {test, expect} from '@playwright/test';
import { ALL_BOOKS_LIST, CREATE_FORM, DETAILS_BUTTONS, DETAILS_DESCRIPTION, LOGGED_NAVBAR, LOGIN_FORM, NAVBAR, REGISTER_FORM } from './utils/locators';
import { ALERT, BASE_URL, REG_TEST_USER, TEST_BOOK, TEST_URL, TEST_USER } from './utils/constants';
//navigation
test('verify "All Books" link is visible', async ({page}) => {
     await page.goto('http://localhost:3000');
//find the element
    await page.waitForSelector('nav.navbar');
     const allBooksLink = await page.$('a[href="/catalog"]');
//checking if the element is visible
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

////////////////////////////example 2////////////////////////////////


test('verify "All Books" link is visible 2', async ({page}) => {
    await page.goto(BASE_URL);

   await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();

   await expect(page.locator(NAVBAR.ALL_BOOKS_LINK)).toBeVisible();
});

test('verify "Login" button is visible ', async ({page}) => {
    await page.goto(BASE_URL);

   await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();

   await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
});

test('verify "Register" button is visible ', async ({page}) => {
    await page.goto(BASE_URL);

   await expect(page.locator(NAVBAR.NAV_NAVBAR)).toBeVisible();

   await expect(page.locator(NAVBAR.REGISTER_BUTTON)).toBeVisible();
});

test('verify that "All Books" lins is visible for logged in users', async ({page}) =>{
    await page.goto(BASE_URL);

    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();

    await page.locator(NAVBAR.LOGIN_BUTTON).click();

    await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

} );

test('Verify user email is visible for logged in users', async ({page}) =>{
    await page.goto(TEST_URL.TEST_LOGIN_URL);
    await expect(page.locator(LOGIN_FORM.LOGIN_FORM)).toBeVisible();

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);

    
    await expect(page.locator(LOGGED_NAVBAR.ER_EMAIL)).toBeVisible();
    await expect(page.locator(LOGGED_NAVBAR.MY_BOOKS)).toBeVisible();
    await expect(page.locator(LOGGED_NAVBAR.ADD_BOOK)).toBeVisible();


});

//Login form tests

test('Login with valid cridentials', async ({page})=>{
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
});

test('Login with empty input fields', async ({page})=>{
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();
    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    })

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
});

test('Login with empty email field', async ({page})=>{
    await page.goto(TEST_URL.TEST_LOGIN_URL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);


    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();
    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    })

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
});

test('Login with empty password field', async ({page})=>{
    await page.goto(TEST_URL.TEST_LOGIN_URL);
    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);


    await page.locator(LOGIN_FORM.LOGIN_BUTTON).click();
    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    })

    await page.waitForURL(TEST_URL.TEST_LOGIN_URL);
    expect(page.url()).toBe(TEST_URL.TEST_LOGIN_URL);
});
     

//Register page

test('Register with valid cridentials', async ({page})=>{
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.REGISTER_EMAIL).fill(REG_TEST_USER.EMAIL);
    await page.locator(REGISTER_FORM.REGISTER_PASSWORD).fill(REG_TEST_USER.PASSWORD);
    await page.locator(REGISTER_FORM.REGISTER_REPEAT_PASSWORD).fill(REG_TEST_USER.PASSWORD);

    await page.locator(REGISTER_FORM.REGISTER_SUBMIT_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
});

test('Register with empty input fields', async ({page})=>{
    await page.goto(TEST_URL.TEST_REGISTER_URL);

    await page.locator(REGISTER_FORM.REGISTER_SUBMIT_BUTTON).click();
    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(ALERT.ALERT_MESSAGE);
        await dialog.accept();
    })

    await page.waitForURL(TEST_URL.TEST_REGISTER_URL);
    expect(page.url()).toBe(TEST_URL.TEST_REGISTER_URL);
});


//Add book page
test('add book with correct data', async ({page})=>{
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);
await Promise.all([
    page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await page.locator(LOGGED_NAVBAR.ADD_BOOK).click();
    await page.locator(CREATE_FORM.TITLE).fill(TEST_BOOK.TITLE);
    await page.locator(CREATE_FORM.DESCRIPTION).fill(TEST_BOOK.DESCRIPTION);
    await page.locator(CREATE_FORM.IMAGE).fill(TEST_BOOK.IMAGE);
    await page.locator(CREATE_FORM.TYPE_OPTION).selectOption(TEST_BOOK.TEST_BOOK_OPTIONS.CLASSIC);
    await page.locator(CREATE_FORM.ADD_BOOK_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_CATALOG_URL);
    expect(page.url()).toBe(TEST_URL.TEST_CATALOG_URL);
});

//all books page

test('verify that all books are displayed for logged in user', async ({page}) =>{

    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    const booksCount = await page.locator('//li[@class="otherBooks"]').count();
    expect(booksCount).toBeGreaterThan(0);

});

test('verify logged-in users see "Details" button', async ({page})=>{
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await page.locator(DETAILS_BUTTONS).first().click();

    await expect(page.locator(DETAILS_DESCRIPTION)).toBeVisible();
});

//Logout functionality

test('Verify "Logout" button is visible for logged-in users', async ({page})=>{
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await expect(page.locator(LOGGED_NAVBAR.LOGOUT_BUTTON)).toBeVisible();



});

test('Verify "Logout" button redirects correctly', async ({page})=>{
    await page.goto(TEST_URL.TEST_LOGIN_URL);

    await page.locator(LOGIN_FORM.EMAIL).fill(TEST_USER.EMAIL);
    await page.locator(LOGIN_FORM.PASSWORD).fill(TEST_USER.PASSWORD);

    await Promise.all([
    page.locator(LOGIN_FORM.LOGIN_BUTTON).click(),
    page.waitForURL(TEST_URL.TEST_CATALOG_URL)
    ]);

    await page.locator(LOGGED_NAVBAR.LOGOUT_BUTTON).click();

    await page.waitForURL(TEST_URL.TEST_HOME_URL);
    expect(page.url()).toBe(TEST_URL.TEST_HOME_URL);
    
    await expect(page.locator(NAVBAR.LOGIN_BUTTON)).toBeVisible();
    await expect(page.locator(LOGGED_NAVBAR.ER_EMAIL)).toBeHidden();
});
