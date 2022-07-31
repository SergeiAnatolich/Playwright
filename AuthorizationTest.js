const { chromium } = require("playwright");
const { UserData } = require("../playwright/user");
const userData = new UserData;

("successful authorization", async () => {
  const browser = await chromium.launch({
    headless: true,
    slowMo: 1000
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.screenshot({ path: './screenshots/openLoginPageTestOk.png', fullPage: true });
  await page.locator('[placeholder="Email"]').fill(userData.email);
  await page.locator('[placeholder="Пароль"]').fill(userData.validPassword);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await page.screenshot({ path: './screenshots/pageProfile.png', fullPage: true });

  await browser.close();
})();

("unsuccessful authorization", async () => {
  const browser = await chromium.launch({
    headless: true,
    slowMo: 1000
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.screenshot({ path: './screenshots/openLoginPageTestNo.png', fullPage: true });
  await page.locator('[placeholder="Email"]').fill(userData.email);
  await page.locator('[placeholder="Пароль"]').fill(userData.invalidPassword);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await page.screenshot({ path: './screenshots/errorMassage.png', fullPage: true });

  await browser.close();
})();