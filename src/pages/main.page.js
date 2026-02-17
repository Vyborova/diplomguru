export class MainPage {
  //техническое описание страницы
  constructor(page) {
    this.page = page;
    this.signupLink = page
      .getByRole("link", { name: "Sign up" })
      .describe("Кнопка/ссылка зарегистрироваться");

    this.loginLink = page.getByRole("link", { name: "Login" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.authorLink = (name) =>
      this.page.locator(`a.author:has-text("${name}")`).first();

    this.globalFeedButton = this.page.locator(
      'button.nav-link:has-text("Global Feed")',
    );
  }
  //  бизнесовые действия со страницей

  async gotoRegister() {
    this.signupLink.click();
  }

  async open(url) {
    await this.page.goto(url);
  }

  async login(email, password) {
    await this.loginLink.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async openMainPage() {
    await this.page.goto("https://realworld.qa.guru/#/");
  }

  async openGlobalFeed() {
    await this.globalFeedButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
