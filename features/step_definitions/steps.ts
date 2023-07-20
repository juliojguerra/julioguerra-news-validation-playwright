import { Given, When, Then, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium, Browser, expect } from "@playwright/test";
import POManager from "../../pageobjects/POManager";
import path from "path";
import fs from "fs";

let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
});

AfterAll(async () => {
  await browser.close();
});

Given("I visit The Guardian site with pre-accepted cookies", async function () {
  const cookiePath = path.join(__dirname, "../../data/cookies.json");
  const cookiesArr = JSON.parse(fs.readFileSync(cookiePath, "utf-8"));

  const context = await browser.newContext({});
  await context.addCookies([...cookiesArr]);
  const page = await context.newPage();

  this.poManager = new POManager(page);

  this.guardianNewsPage = this.poManager.getGuardianNewsPage();
  await this.guardianNewsPage.goToPage();
});

When("I get the all the News Article", async function () {
  this.newsTitles = await this.guardianNewsPage.getNewsTitles();
});

When(
  "I go to Google to search the first News Article and log it",
  async function () {
    const googlePage = this.poManager.getGooglePage();
    await googlePage.goToPage();

    // Accept all cookies in Google
    await googlePage.acceptCookies();

    const positionNewsArticle = 1;
    const numValidSources = 2;

    this.firstNewsLog = await googlePage.searchAndLogValidNews(
      this.newsTitles,
      positionNewsArticle,
      numValidSources
    );
  }
);

Then("I should expect that the first News Article is valid", async function () {
  expect(this.firstNewsLog.title).toBeDefined();
  expect(this.firstNewsLog.isValid).toBeTruthy();

  if (!this.firstNewsLog.isValid) {
    throw new Error(`News Title: "${this.firstNewsLog.title} "is not valid`);
  }
});
