import axios from 'axios';

const defaultURL =
  process.env.REACT_APP_URL_API || `http://${document.location.hostname}:1111`;

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
