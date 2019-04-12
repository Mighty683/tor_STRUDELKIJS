import axios from 'axios';

const defaultURL = 'http://localhost:1111';

export default {
  getPoints(latitude, longitude) {
    return axios.get(`${defaultURL}/points-list`, {
      params: {
        longitude,
        latitude
      }
    });
  }
};
