import { test, expect } from '@playwright/test';
import { loginPage } from '../../pages/Authentication/loginPage.ts';
import { homePage } from '../../pages/HomePage/homePage.ts';
import { wishlistPage } from '../../pages/Account/WishlistPage.ts';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

test('Add item to wishlist and verify', async ({page}) => {

    

})