const NAVBAR = {
    NAV_NAVBAR: 'nav.navbar',
    ALL_BOOKS_LINK: 'a[href="/catalog"]',
    LOGIN_BUTTON: 'a[href="/login"]',
    REGISTER_BUTTON: 'a[href="/register"]'

    
}

const LOGIN_FORM = {
    LOGIN_FORM: '#login-form',
    EMAIL: 'input[id="email"]',
    PASSWORD: 'input[id="password"]',
    LOGIN_BUTTON: '#login-form input[type="submit"]'

}

const REGISTER_FORM = {
    REGISTER_FORM: '#register-form',
    REGISTER_EMAIL: 'input[id="email"]',
    REGISTER_PASSWORD: 'input[id="password"]',
    REGISTER_REPEAT_PASSWORD: '#register-form input[id="repeat-pass"]',
    REGISTER_SUBMIT_BUTTON: '#register-form input[type="submit"]'
}

const LOGGED_NAVBAR = {
    ER_EMAIL: '//span[text()="Welcome, peter@abv.bg"]',
    MY_BOOKS: 'a[href="/profile"]',
    ADD_BOOK: 'a[href="/create"]',
    LOGOUT_BUTTON: 'a[id="logoutBtn"]'
}

const CREATE_FORM = {
    TITLE: 'input[id="title"]',
    DESCRIPTION: 'textarea[id="description"]',
    IMAGE: 'input[id="image"]',
    TYPE_OPTION: '#type',
    ADD_BOOK_BUTTON: '#create-form input[type="submit"]'
}

const ALL_BOOKS_LIST = '//li[@class="otherBooks"]';

const DETAILS_BUTTONS = '//a[text()="Details"]';
const DETAILS_DESCRIPTION = '//h3[text()="Description:"]';

export{
    NAVBAR,
    LOGIN_FORM,
    LOGGED_NAVBAR,
    CREATE_FORM,
    ALL_BOOKS_LIST,
    DETAILS_BUTTONS,
    DETAILS_DESCRIPTION,
    REGISTER_FORM
    
}