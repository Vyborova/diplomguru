export class AirportService {
  constructor(request) {
    this.request = request;
    this.baseUrl = "https://airportgap.com/api";
  }

  // Аутентификация
  async getAuthToken(email, password) {
    const response = await this.request.post(`${this.baseUrl}/tokens`, {
      data: { email, password },
    });
    const data = await response.json();
    return data.token;
  }

  // Аэропорты
  async getAirports() {
    const response = await this.request.get(`${this.baseUrl}/airports`);
    return response.json();
  }

  async getAirportById(id) {
    const response = await this.request.get(`${this.baseUrl}/airports/${id}`);
    return response.json();
  }

  async getDistance(from, to) {
    const response = await this.request.post(
      `${this.baseUrl}/airports/distance`,
      {
        data: { from, to },
      },
    );
    return response.json();
  }

  // Избранные
  async getFavorites(token) {
    const response = await this.request.get(`${this.baseUrl}/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  }

  async addToFavorites(token, airportId, note = "") {
    const response = await this.request.post(`${this.baseUrl}/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { airport_id: airportId, note },
    });
    return response.json();
  }

  async getFavoriteById(token, id) {
    const response = await this.request.get(`${this.baseUrl}/favorites/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  }
}
