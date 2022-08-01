const { test, expect } = require("@playwright/test");

test("test", async ({ page }) => {
  // Go to https://netology.ru/free/management#/
  await page.goto("https://netology.ru/free/management#/");

  // Click a
  await page.click("a");
  await expect(page).toHaveURL("https://netology.ru/");

  // Click text=Учиться бесплатно
  await page.click("text=Учиться бесплатно");
  await expect(page).toHaveURL("https://netology.ru/free");

  page.click("text=Бизнес и управление");

  // Click text=Как стать продакт или проджект-менеджером
  await page.click("text=Как стать продакт или проджект-менеджером");
  await expect(page).toHaveURL(
    "https://netology.ru/programs/product-project-marathon"
  );
});
