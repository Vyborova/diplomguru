import { expect } from "@playwright/test";

export class ArticleViewPage {
  constructor(page) {
    this.page = page;

    this.commentInput = page.getByPlaceholder("Write a comment...");
    this.postCommentButton = page.getByRole("button", { name: "Post Comment" });
    this.deleteArticleButton = page
      .getByRole("button", { name: "Delete Article" })
      .first();

    this.editArticleLink = page
      .getByRole("link", { name: /Edit Article/i })
      .first();
    this.favoriteButton = page
      .locator('[data-testid="favorite-button"], button:has(.ion-heart)')
      .first();
  }

  async addComment(text) {
    await this.commentInput.fill(text);
    await this.postCommentButton.click();
  }

  commentByText(text) {
    return this.page.getByText(text);
  }
  async deleteArticle() {
    await this.deleteArticleButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
  deleteArticleButton() {
    return this.page.getByRole("button", { name: "Delete Article" });
  }
  async gotoEditArticle() {
    await this.editArticleLink.click();
    await this.page.waitForURL("**/#/editor/**");
  }
  async favoriteArticle() {
    await this.favoriteButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
