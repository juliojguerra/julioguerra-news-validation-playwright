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

  async searchAndLogValidNews(newsTitles: Array<string>) {
    let validNewsCount: number;
    let newsValidArr: NewsItem[] = [];

    for (let index = 1; index <= 2; index++) {
      validNewsCount = 0;
      let title = newsTitles[index];

      await this.searchFor(title, index);

      validNewsCount = await this.getValidNewsCount();

      newsValidArr.push({
        title: title,
        isValid: validNewsCount >= 2 ? true : false,
      });
    }

    // console.log("newsValidArr:", newsValidArr);

    return newsValidArr;
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

  async getValidNewsCount() {
    let validNewsCount: number = 0;

    const googleNewsSites = await this.googleNewsTitles.allTextContents();

    for (
      let index = 0;
      index < googleNewsSites.length && validNewsCount <= 2;
      index++
    ) {
      if (googleNewsSites[index] != "The Guardian") {
        validNewsCount++;
      }
    }

    return validNewsCount;
  }

  assertValidNews(newsValidArr: NewsItem[]) {
    for (let index = 0; index < newsValidArr.length; index++) {
      console.log(
        `News Title: "${newsValidArr[index].title}" ${
          newsValidArr[index].isValid ? "is valid" : "is not valid"
        }`
      );

      expect(newsValidArr[index].isValid).toBeTruthy();
    }
  }

  async getGoogleNewsSites() {
    return this.googleNewsTitles.allTextContents();
  }
}

export default GooglePage;
