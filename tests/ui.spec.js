import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { MainPage } from "../src/pages/main.page";
import { ArticleFormPage } from "../src/pages/articleForm.page";
import { ArticleViewPage } from "../src/pages/articleView.page";
import { ProfilePage } from "../src/pages/profile.page";
import { UserBuilder } from "../src/builders/user.builder.js";
import { ArticleBuilder } from "../src/builders/article.builder.js";

test.describe("UI: статьи", () => {
  const url = "https://realworld.qa.guru/#/";
  let user;

  test.beforeEach(async ({ page }) => {
    user = UserBuilder.real().build(); // Используем UserBuilder
    const mainPage = new MainPage(page);
    await mainPage.open(url);
    await mainPage.login(user.email, user.password);
  });

  test("Пользователь может создать новую статью", async ({ page }) => {
    const articleFormPage = new ArticleFormPage(page);
    const articleViewPage = new ArticleViewPage(page);

    // Используем ArticleBuilder
    const article = new ArticleBuilder()
      .withTitle(faker.lorem.sentence())
      .withDescription(faker.lorem.paragraph())
      .withBody(faker.lorem.paragraphs(2))
      .withTags([faker.lorem.word()])
      .build();

    await articleFormPage.gotoNewArticle();
    await articleFormPage.createAndPublishArticle(
      article.title,
      article.description,
      article.body,
      article.tags,
    );

    await expect(page.getByText(article.title)).toBeVisible();
    await articleViewPage.addComment("Test comment");
    await expect(articleViewPage.commentByText("Test comment")).toBeVisible();
  });

  test("Проверяем отображение созданной статьи в Global Feed", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);
    const articleFormPage = new ArticleFormPage(page);

    // Используем ArticleBuilder
    const article = new ArticleBuilder()
      .withTitle(faker.lorem.sentence())
      .withDescription(faker.lorem.paragraph())
      .withBody(faker.lorem.paragraphs(2))
      .withTags([faker.lorem.word()])
      .build();

    await articleFormPage.gotoNewArticle();
    await articleFormPage.createAndPublishArticle(
      article.title,
      article.description,
      article.body,
      article.tags,
    );

    await mainPage.openMainPage();
    await mainPage.openGlobalFeed();

    await expect(page.getByText(article.title)).toBeVisible();
    await expect(mainPage.authorLink(user.name)).toBeVisible();
  });

  test("Пользователь может добавить комментарий к статье", async ({ page }) => {
    const articleFormPage = new ArticleFormPage(page);
    const articleViewPage = new ArticleViewPage(page);

    // Используем ArticleBuilder
    const article = new ArticleBuilder()
      .withTitle(faker.lorem.sentence())
      .withDescription(faker.lorem.paragraph())
      .withBody(faker.lorem.paragraphs(2))
      .withTags([faker.lorem.word()])
      .build();

    const comment = faker.lorem.sentence();

    await articleFormPage.gotoNewArticle();
    await articleFormPage.createAndPublishArticle(
      article.title,
      article.description,
      article.body,
      article.tags,
    );

    await articleViewPage.addComment(comment);
    await expect(articleViewPage.commentByText(comment)).toBeVisible();
  });

  test("Пользователь может отредактировать статью", async ({ page }) => {
    const articleFormPage = new ArticleFormPage(page);
    const articleViewPage = new ArticleViewPage(page);

    // Используем ArticleBuilder для оригинальной статьи
    const article = new ArticleBuilder()
      .withTitle(faker.lorem.sentence())
      .withDescription(faker.lorem.paragraph())
      .withBody(faker.lorem.paragraphs(2))
      .withTags([faker.lorem.word()])
      .build();

    await articleFormPage.gotoNewArticle();
    await articleFormPage.createAndPublishArticle(
      article.title,
      article.description,
      article.body,
      article.tags,
    );

    await expect(page.getByText(article.title)).toBeVisible();

    await articleViewPage.gotoEditArticle();

    // Используем ArticleBuilder для обновленной статьи
    const updatedArticle = new ArticleBuilder()
      .withTitle(article.title) // Сохраняем тот же заголовок
      .withDescription(faker.lorem.paragraph())
      .withBody(faker.lorem.paragraphs(2))
      .withTags(article.tags) // Сохраняем те же теги
      .build();

    await articleFormPage.createAndPublishArticle(
      updatedArticle.title,
      updatedArticle.description,
      updatedArticle.body,
      updatedArticle.tags,
    );

    await expect(page.getByText(updatedArticle.body)).toBeVisible();
  });

  test("Пользователь может добавить статью в Favorited Articles", async ({
    page,
  }) => {
    const articleFormPage = new ArticleFormPage(page);
    const articleViewPage = new ArticleViewPage(page);
    const profilePage = new ProfilePage(page);

    // Используем ArticleBuilder
    const article = new ArticleBuilder()
      .withTitle(faker.lorem.sentence())
      .withDescription(faker.lorem.paragraph())
      .withBody(faker.lorem.paragraphs(2))
      .withTags([faker.lorem.word()])
      .build();

    await articleFormPage.gotoNewArticle();
    await articleFormPage.createAndPublishArticle(
      article.title,
      article.description,
      article.body,
      article.tags,
    );

    await expect(articleViewPage.favoriteButton).toBeVisible({
      timeout: 10000,
    });
    await articleViewPage.favoriteArticle();

    await page.goto(
      `https://realworld.qa.guru/#/profile/${user.name}/favorites`,
    ); // Используем user.name
    await profilePage.gotoFavoritedArticles();

    await expect(page.getByText(article.title)).toBeVisible();
  });
});
