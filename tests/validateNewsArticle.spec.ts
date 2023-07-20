import { expect, test } from "@playwright/test";
import POManager from "../pageobjects/POManager";
import path from "path";
import fs from "fs";

test("Validate News Article", async ({ browser }) => {
  // Load cookie data from JSON file
  const cookiePath = path.join(__dirname, "../data/cookies.json");
  const cookiesArr = JSON.parse(fs.readFileSync(cookiePath, "utf-8"));
  const context = await browser.newContext({});
  await context.addCookies([...cookiesArr]);
  const page = await context.newPage();

  // Initialize Page Objects Manager
  const poManager = new POManager(page);

  const guardianNewsPage = poManager.getGuardianNewsPage();
  await guardianNewsPage.goToPage();

  const newsTitles = await guardianNewsPage.getNewsTitles();

  const googlePage = poManager.getGooglePage();
  await googlePage.goToPage();

  // Accept all cookies
  await googlePage.acceptCookies();

  const newsValidArr = await googlePage.searchAndLogValidNews(newsTitles);

  // googlePage.assertValidNews(newsValidArr);

  for (const news of newsValidArr) {
    expect(news.title).toBeDefined;
    expect(news.isValid).toBeTruthy;

    if (!news.isValid) {
      console.log(
        `News Title: "${news.title} "is not valid"
        }`
      );
    }
  }
});
