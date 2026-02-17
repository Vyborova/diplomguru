import { test, expect } from "@playwright/test";
import { AirportService } from "../src/services/airport.service.js";
import { DataGenerator } from "../src/helpers/data-generator.js";
import { AirportFacade } from "../src/services/airport.facade.js";

test.describe("API: Airport Gap", () => {
  test("Получить токен авторизации", async ({ request }) => {
    const facade = new AirportFacade(request);
    const { token } = await facade.getAuthenticatedUser();

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(token).toBe("kNwDUV8DK9SF1ZhGx9NjKSSx");
  });

  test("Получить список аэропортов", async ({ request }) => {
    const facade = new AirportFacade(request);
    const airports = await facade.getAllAirports();

    expect(airports).toHaveProperty("data");
    expect(Array.isArray(airports.data)).toBe(true);
    expect(airports.data.length).toBeGreaterThan(0);
  });

  test("Получить аэропорт по ID", async ({ request }) => {
    const facade = new AirportFacade(request);
    const airportId = DataGenerator.generateAirportId();
    const airport = await facade.getAirportById(airportId);

    expect(airport.data).toHaveProperty("attributes");
    expect(airport.data.attributes).toHaveProperty("icao");
    expect(airport.data.attributes).toHaveProperty("city");
  });

  test("Рассчитать расстояние между аэропортами", async ({ request }) => {
    const facade = new AirportFacade(request);
    const distance = await facade.getDistance("KIX", "NRT");

    expect(distance.data).toHaveProperty("attributes");
    expect(distance.data.attributes).toHaveProperty("kilometers");
    expect(distance.data.attributes.kilometers).toBe(490.8053652969214);
  });

  test("Добавить аэропорт в избранное", async ({ request }) => {
    const facade = new AirportFacade(request);
    const favorite = await facade.addRandomFavoriteAirport();

    expect(favorite).toBeDefined();
    expect(favorite.data).toHaveProperty("id");
    expect(favorite.data.attributes.note).toBeDefined();
  });
});
