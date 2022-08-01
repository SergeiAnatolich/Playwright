const { UserData } = require("../user");
const userData = new UserData;
const { test, expect } = require('@playwright/test');

test.describe('Authorization', () => {
  test("successful authorization", async ({page}) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.locator('[data-testid="profile-personal-info-avatar-popup"]').screenshot({ path: './screenshots/openLoginPageTestSuccessful.png', fullPage: true });
    await page.locator('[placeholder="Email"]').fill(userData.validEmail);
    await page.locator('[placeholder="Пароль"]').fill(userData.validPassword);
    await page.locator('[data-testid="login-submit-btn"]').click();
    const heading = await page.locator('text=Мои курсы и профессии');
    expect(heading).toBeVisible;
    await page.locator('text=Мои курсы и профессии').screenshot({ path: './screenshots/heading.png'});
    await page.screenshot({ path: './screenshots/pageProfile.png', fullPage: true });
  });
  
  test("unsuccessful authorization", async ({page}) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.locator('[data-testid="profile-personal-info-avatar-popup"]').screenshot({ path: './screenshots/openLoginPageTestUnsuccessful.png', fullPage: true });
    await page.locator('[placeholder="Email"]').fill(userData.invalidEmail);
    await page.locator('[placeholder="Пароль"]').fill(userData.invalidPassword);
    await page.locator('[data-testid="login-submit-btn"]').click();
    const errorMessage = await page.locator('[data-testid="login-error-hint"]');
    await page.locator('[data-testid="profile-personal-info-avatar-popup"]').screenshot({ path: './screenshots/errorMessage.png', fullPage: true});
    expect(errorMessage).toBeVisible;
  });
});
