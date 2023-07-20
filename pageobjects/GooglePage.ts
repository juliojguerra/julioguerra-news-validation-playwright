import { Locator, Page, expect } from "@playwright/test";

interface NewsItem {
  title: string;
  isValid: boolean;
}

class GooglePage {
  page: Page;
  googleSearchInput: Locator;
  googleNewsTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    this.googleSearchInput = this.page.locator("textarea[class='gLFyf']");
    this.googleNewsTitles = this.page.locator("#search .MgUUmf span");
  }

  async goToPage() {
    // Adding ?hl=en to display the site in English and use it for tests
    await this.page.goto("https://www.google.com/?hl=en");
  }

  async acceptCookies() {
    await this.page.getByRole("button", { name: "Accept all" }).click();
  }

  async searchAndLogValidNews(
    newsTitles: Array<string>,
    position: number,
    numValidSources: number
  ) {
    let validNewsCount: number;
    let newsItemLog: NewsItem;

    validNewsCount = 0;
    let title = newsTitles[position];

    await this.searchFor(title, position);

    validNewsCount = await this.getValidNewsCount(numValidSources);

    newsItemLog = {
      title: title,
      isValid: validNewsCount >= numValidSources ? true : false,
    };

    return newsItemLog;
  }

  async searchFor(title: string, index: number) {
    await this.googleSearchInput.fill(title);

    if (index == 1) {
      await this.page.getByRole("button", { name: "Google Search" }).click();
      await this.page.getByRole("link", { name: "News", exact: true }).click();
    } else {
      await this.page.getByLabel("Google Search").click();
    }

    await this.page.waitForURL("**/search?**");
  }

  async getValidNewsCount(numValidSources: number) {
    let validNewsCount: number = 0;

    const googleNewsSites = await this.googleNewsTitles.allTextContents();

    for (
      let index = 0;
      index < googleNewsSites.length && validNewsCount <= numValidSources;
      index++
    ) {
      if (googleNewsSites[index] != "The Guardian") {
        validNewsCount++;
      }
    }

    return validNewsCount;
  }

  async getGoogleNewsSites() {
    return this.googleNewsTitles.allTextContents();
  }
}

export default GooglePage;
