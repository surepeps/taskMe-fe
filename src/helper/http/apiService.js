import axios from 'axios';
import generalConfig from '../../config/generalConfig'

class ApiService {
  constructor(baseURL = generalConfig.APIURL) {
    this.instance = axios.create({
      baseURL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  getToken() {
    const undecodedToken = localStorage.getItem('token');
    return JSON.parse(undecodedToken);
  }

  async request(method, endpoint, payload = null) {
    // eslint-disable-next-line no-useless-catch
    try {
      const token = this.getToken();
      const options = {};

      if (token) {
        options.headers = {
          Authorization: `Bearer ${token}`,
        };
      }

      if (payload !== null) {
        options.data = payload;
      }

      const response = await this.instance.request({
        method,
        url: endpoint,
        ...options,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getWithToken(endpoint) {
    return this.request('get', endpoint);
  }

  async postWithToken(endpoint, payload) {
    return this.request('post', endpoint, payload);
  }

  async postWithOutToken(endpoint, payload) {
    return this.request('post', endpoint, payload);
  }

  async getWithOutToken(endpoint) {
    return this.request('get', endpoint);
  }

  async getWithParams(endpoint, params = {}) {
    // eslint-disable-next-line no-useless-catch
    try {
      const token = this.getToken();
      const options = {};

      if (token) {
        options.headers = {
          Authorization: `Bearer ${token.token}`,
        };
      }

      options.params = params; // Pass the query parameters here

      const response = await this.instance.request({
        method: 'get',
        url: endpoint,
        ...options,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiService;
