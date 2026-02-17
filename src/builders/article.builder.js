export class ArticleBuilder {
  constructor() {
    this.title = "";
    this.description = "";
    this.body = "";
    this.tags = [];
  }

  withTitle(title) {
    this.title = title;
    return this;
  }

  withDescription(description) {
    this.description = description;
    return this;
  }

  withBody(body) {
    this.body = body;
    return this;
  }

  withTags(tags) {
    this.tags = tags;
    return this;
  }

  build() {
    return {
      title: this.title,
      description: this.description,
      body: this.body,
      tags: this.tags,
    };
  }
}
