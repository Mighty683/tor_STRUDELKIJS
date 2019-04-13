import axios from 'axios';

const defaultURL = process.env.hostname || `http://192.168.137.1:1111`;

export default {
  getPoints(latitude, longitude) {
    return axios.get(`${defaultURL}/points-list`, {
      params: {
        latitude,
        longitude
      }
    });
  }
};
