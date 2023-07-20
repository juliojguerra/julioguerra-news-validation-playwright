import { Locator, Page } from "@playwright/test";

class GuardianNewsPage {
  page: Page;
  headlines: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headlines = page.locator(".fc-item__link .js-headline-text");
  }

  async goToPage() {
    await this.page.goto("https://www.theguardian.com/tone/news");
  }

  async getNewsTitles() {
    return this.headlines.allTextContents();
  }
}

export default GuardianNewsPage;
