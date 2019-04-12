import axios from 'axios';

const defaultURL = 'http://localhost:1111';

export default {
  getPoints(longitude, latitude) {
    return axios.get(`${defaultURL}`);
  }
};
