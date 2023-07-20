import { expect, test } from "@playwright/test";
import POManager from "../pageobjects/POManager";
import path from "path";
import fs from "fs";

test("First News Article is valid", async ({ browser }) => {
  // Load cookie data from JSON file
  const cookiePath = path.join(__dirname, "../data/cookies.json");
  const cookiesArr = JSON.parse(fs.readFileSync(cookiePath, "utf-8"));
  const context = await browser.newContext({});
  await context.addCookies([...cookiesArr]);

  // Prepare page
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

  // Search for the first article
  const positionNewsArticle = 1;
  const numValidSources = 2;

  // Log News Article as valid if it has a minimum of numValidSources
  const firstNewsLog = await googlePage.searchAndLogValidNews(
    newsTitles,
    positionNewsArticle,
    numValidSources
  );

  // Assertions, expect article to be valid (2 or more sources were found)
  expect(firstNewsLog.title).toBeDefined();
  expect(firstNewsLog.isValid).toBeTruthy();

  if (!firstNewsLog.isValid) {
    throw new Error(`News Title: "${firstNewsLog.title} "is not valid`);
  }
});
