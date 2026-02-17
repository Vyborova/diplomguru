// src/services/airport.facade.js
import { AirportService } from "./airport.service.js";
import { DataGenerator } from "../helpers/data-generator.js";

export class AirportFacade {
  constructor(request) {
    this.service = new AirportService(request);
    this.generator = DataGenerator;
  }

  async addRandomFavoriteAirport() {
    console.log("Добавляем аэропорт в избранное...");

    const { token } = await this.getAuthenticatedUser();
    console.log("Токен получен:", token);

    const airportId = this.generator.generateAirportId();
    const note = this.generator.generateAirportNote();
    console.log("Airport ID:", airportId, "Note:", note);

    const result = await this.service.addToFavorites(token, airportId, note);
    console.log("Результат:", result);

    return result;
  }

  async getAuthenticatedUser() {
    const user = this.generator.generateUser();
    console.log("Пользователь:", user);

    const token = await this.service.getAuthToken(user.email, user.password);
    console.log("Токен:", token);

    return { user, token };
  }

  async getAirportById(airportId) {
    return await this.service.getAirportById(airportId);
  }

  async getDistance(from, to) {
    return await this.service.getDistance(from, to);
  }

  async getAllAirports() {
    return await this.service.getAirports();
  }
}
