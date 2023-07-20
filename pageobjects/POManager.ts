import { Page } from "@playwright/test";
import GuardianNewsPage from "./GuardianNewsPage";
import GooglePage from "./GooglePage";

class POManager {
  page: Page;
  guardianNewsPage: GuardianNewsPage;
  googlePage: GooglePage;

  constructor(page: Page) {
    this.page = page;
    this.guardianNewsPage = new GuardianNewsPage(page);
    this.googlePage = new GooglePage(page);
  }

  getGuardianNewsPage() {
    return this.guardianNewsPage;
  }

  getGooglePage() {
    return this.googlePage;
  }
}

export default POManager;
