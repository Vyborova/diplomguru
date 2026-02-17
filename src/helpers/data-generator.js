import { faker } from "@faker-js/faker";

export class DataGenerator {
  static generateUser() {
    return {
      email: "vyborova.ma@yandex.ru",
      password: "Vybor2026",
    };
  }

  static generateAirportNote() {
    return faker.lorem.sentence();
  }

  static generateAirportId() {
    return faker.helpers.arrayElement(["KIX", "NRT", "JFK", "LAX", "LHR"]);
  }
}
